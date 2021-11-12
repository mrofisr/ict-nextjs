import prisma from "@/libs/prisma";
import { succes, error } from "@/utils/res";
import { authApi } from "@/middlewares/authApi";

export default async function handler(req, res) {
	if (req.method !== "GET")
		return res.status(405).json({
			...error,
			error_status: 405,
			message: `Request method ${req.method} not allowed`,
		});
	const auth = await authApi(req, res, "admin");
	const { role } = req.query;
	if (!role)
		return res.status(400).json({
			...error,
			message:
				"Must send request query role table user / table user penitipan",
		});
	switch (role) {
		case "user":
			// * select all user
			const user = await prisma.table_user.findMany({
				select: {
					id_user: true,
					nama: true,
					email: true
				}
			});
			return res.status(200).json({
				...succes,
				message: "Get all user succesfully",
				data: user,
			});
		case "user_penitipan":
			// * select all user penitipan
			const userPenitipan = await prisma.table_user_penitipan.findMany({
				select: {
					id_user_penitipan: true,
					nama: true,
					email: true
				}
			});
			return res.status(200).json({
				...succes,
				message: "Get all user penitipan succesfully",
				data: userPenitipan,
			});
		default:
			return res.status(400).json({
				...error,
				message: "Request query not valid",
			});
	}
}
