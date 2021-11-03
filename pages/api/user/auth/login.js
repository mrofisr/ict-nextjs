import jwt from "jsonwebtoken";
import { succes, error } from "@/utils/res";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";

export default async function handler(req, res) {
	if (req.method !== "POST")
		return res.status(405).json({
			...error,
			error_status: 405,
			message: `Method ${req.method} not allowed`,
		});
	const { role } = req.query;
	if (!role)
		return res.status(404).json({
			...error,
			error_status: 404,
			message: "Must be send request query",
		});
	const { email: logEmail, password: logPassword } = req.body;
	if (!logEmail || !logPassword)
		return res.status(400).json({
			...error,
			error_status: 400,
			message: "Missing data from request body",
		});

	switch (role) {
		case "user":
			const checkEmail = await prisma.table_user.findFirst({
				where: {
					email: logEmail,
				},
			});
			if (!checkEmail)
				return res.status(404).json({
					...error,
					error_status: 404,
					message: "Wrong email",
				});
			const checkPassword = bcrypt.compareSync(
				logPassword,
				checkEmail.password
			);
			if (!checkPassword)
				return res.status(404).json({
					...error,
					error_code: 404,
					message: "Wrong password",
				});

			// * generate token
			const newToken = jwt.sign(
				{
					id: checkEmail.id_admin,
					nama: checkEmail.nama,
					email: checkEmail.email,
					role: "user",
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "7d",
				}
			);
			return res.status(200).json({
				...succes,
				message: "Login user succesfully",
				data: {
					token: newToken,
				},
			});
		case "user_penitipan":
			const checkEmailPenitipan =
				await prisma.table_user_penitipan.findFirst({
					where: {
						email: logEmail,
					},
				});
			if (!checkEmailPenitipan)
				return res.status(404).json({
					...error,
					error_status: 404,
					message: "Wrong email",
				});
			const checkPasswordPenitipan = bcrypt.compareSync(
				logPassword,
				checkEmailPenitipan.password
			);
			if (!checkPasswordPenitipan)
				return res.status(404).json({
					...error,
					error_code: 404,
					message: "Wrong password",
				});

			// * generate token
			const newTokenPenitipan = jwt.sign(
				{
					id: checkEmailPenitipan.id_admin,
					nama: checkEmailPenitipan.nama,
					email: checkEmailPenitipan.email,
					role: "user_penitipan",
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "7d",
				}
			);
			return res.status(200).json({
				...succes,
				message: "Login user succesfully",
				data: {
					token: newTokenPenitipan,
				},
			});

		default:
			return res.status(400).json({
				...error,
				message: `Requst query ${role} not valid`,
			});
	}
}
