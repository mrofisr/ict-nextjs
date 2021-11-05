import prisma from "@/libs/prisma";
import { succes, error } from "@/utils/res";

export default async function handler(req, res) {
	if (req.method !== "GET")
		return res.status(405).json({
			...error,
			error_status: 405,
			message: `Method ${req.method} not allowed`,
		});
	const { city } = req.query;
	if (!city)
		return res.status(404).json({
			...error,
			error_status: 404,
			message: "Request query must be send",
		});
	const select = await prisma.detail_tempat_penitipan.findMany({
		where: { kota: city },
		select: {
			id_user_tempat_penitipan: true,
			nama_tempat_penitipan: true,
			harga: true,
			kota: true,
			foto_tempat_penitipan: true,
		},
	});
	res.status(200).json({
		...succes,
		message: "Select all space by city succesfully",
		data: select,
	});
}
