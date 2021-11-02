import { succes, error } from "@/utils/res";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/libs/prisma";

export default async function handler(req, res) {
	if (req.method !== "POST")
		return res.status(405).json({
			...error,
			error_status: 405,
			message: `Method ${req.method} not allowed`,
		});
	const { nama: logNama, email: logEmail, password: logPassword } = req.body;
	if (!logNama || !logEmail || !logPassword)
		return res.status(400).json({
			...error,
			error_status: 400,
			message: "Missing data from request body",
		});
	const checkNama = await prisma.admin.findFirst({
		where: {
			nama: logNama,
		},
	});
	if (!checkNama)
		return res.status(404).json({
			...error,
			error_status: 404,
			message: "Wrong nama",
		});
	const checkEmail = await prisma.admin.findFirst({
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
	const selectedUser = await prisma.admin.findFirst({
		where: {
			AND: [{ email: logEmail }, { nama: logNama }],
		},
	});
	const checkPassword = bcrypt.compareSync(
		logPassword,
		selectedUser.password
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
			id: selectedUser.id_admin,
			nama: selectedUser.nama,
			email: selectedUser.email,
			role: "admin"
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "7d",
		}
	);

	res.status(200).json({
		...succes,
		message: "Login admin succesfully",
		data: {
			token: newToken,
		},
	});
}
