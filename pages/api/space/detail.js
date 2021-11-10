import prisma from "@/libs/prisma";
import { succes, error } from "@/utils/res";

export default async function handler(req, res) {
	if (req.method !== "GET")
		return res.status(405).json({
			...error,
			error_status: 404,
			message: `Method ${req.method} not allowed`,
		});
	const { id } = req.query;
	if (!id)
		return res.status(404).json({
			...error,
			error_status: 404,
			message: "Request query must be send",
		});
	const {harga, table_user_penitipan: {nama}, ...exception} = await prisma.detail_tempat_penitipan.findFirst({
		where: { id_detail_tempat_penitipan: parseInt(id) },
		include: {table_user_penitipan: true}
	});
	res.status(200).json({
		...succes,
		message: "Get detail space succesfully",
		data: {
			nama,
			...exception
		}
	});
}
