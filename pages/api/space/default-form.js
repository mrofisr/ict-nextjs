import prisma from "@/libs/prisma";
import { succes, error } from "@/utils/res";
import { authApi } from "@/middlewares/authApi";

export default async function handler(req, res) {
	if (req.method !== "GET")
		return res.status(405).json({
			...error,
			error_status: 405,
			message: `Method ${req.method} not allowed`,
		});
	const auth = await authApi(req, res, "user_penitipan");
	const select = await prisma.detail_tempat_penitipan.findFirst({
		where: { id_user_tempat_penitipan: auth.id },
	});
	res.status(200).json({
		...succes,
		message: "Get default value for from succesfully",
		data: select,
	});
}
