import prisma from "@/libs/prisma";
import { error, succes } from "@/utils/res";
import { authApi } from "@/middlewares/authApi";
import getRequest from "@/libs/get-req";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	switch (req.method) {
		case "GET":
			const selectSpace = await prisma.detail_tempat_penitipan.findMany({
				select: {
					nama_tempat_penitipan: true,
					harga: true,
					kota: true,
					foto_tempat_penitipan: true,
					id_user_tempat_penitipan: true,
					id_detail_tempat_penitipan: true
				},
			});
			return res.status(200).json({
				...succes,
				message: "Select all data succesfully",
				data: selectSpace,
			});
		case "POST":
			const auth = await authApi(req, res, "user_penitipan");
			const { fields, files } = await getRequest(req, "./public/space");
			const { nama_penitipan, alamat, kota, harga, deskripsi } = fields;
			const { foto_1, foto_2, foto_3 } = files;
			if (
				!nama_penitipan ||
				!alamat ||
				!kota ||
				!harga ||
				!deskripsi ||
				!foto_1 ||
				!foto_2 ||
				!foto_3
			)
				return res.status(400).json({
					...error,
					message: "Req body not valid / some missing",
				});
			const addSpace = await prisma.detail_tempat_penitipan.create({
				data: {
					id_user_tempat_penitipan: auth.id,
					nama_tempat_penitipan: nama_penitipan,
					alamat: alamat,
					kota: kota,
					harga: harga,
					deskripsi: deskripsi,
					foto_tempat_penitipan: foto_1.path,
					foto_tempat_penitipan_2: foto_2.path,
					foto_tempat_penitipan_3: foto_3.path,
				},
			});
			return res.status(200).json({
				...succes,
				message: "Create detail tempat penitipan succesfully",
				data: addSpace,
			});

		case "PUT":
		// const update_auth = await authApi(req, res, "user_penitipan");
		// const {fields:upFields, files:upFiles} = await getRequest(req, "./public/space");
		// const {nama_penitipan: upNama, alamat: upAlamat, kota: upKota, harga: upHarga, deskripsi: upDesc} = upFields;
		// const {foto_1: upfoto_1, foto_2: upFoto_2, foto_3: upFoto_3} = upFiles;
		// console.log(upfoto_1);
		// return res.status(200).json({
		//     ...succes,
		//     message: "Update data succesfully"
		// })

		case "DELETE":
			const auth_admin = await authApi(req, res, "admin");
			const { id } = req.query;
			if (!id)
				return res.status(404).json({
					...error,
					error_status: 404,
					message: "Must be send request query",
				});
			const deleteSpace = await prisma.detail_tempat_penitipan.delete({
				where: { id_detail_tempat_penitipan: parseInt(id) },
			});
			return res.status(200).json({
				...succes,
				message: "Delete space succesfully",
				data: deleteSpace,
			});
		default:
			return res.status(405).json({
				...error,
				error_status: 405,
				message: `Method ${req.method} not allowed`,
			});
	}
}
