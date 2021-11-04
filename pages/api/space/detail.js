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
	const { nama } = await prisma.table_user_penitipan.findFirst({
		where: { id_user_penitipan: parseInt(id) },
		select: {
			nama: true,
		},
	});
	const getDetailPenitipan = await prisma.detail_tempat_penitipan.findFirst({
		where: { id_user_tempat_penitipan: parseInt(id) },
		select: {
			id_user_tempat_penitipan: true,
			nama_tempat_penitipan: true,
			kota: true,
			harga: true,
			deskripsi: true,
			foto_tempat_penitipan: true,
			foto_tempat_penitipan_2: true,
			foto_tempat_penitipan_3: true,
		},
	});
	res.status(200).json({
		...succes,
		message: "Get detail space succesfully",
		data: {
			nama,
			...getDetailPenitipan,
		},
	});
}
