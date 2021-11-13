import { succes, error } from "@/utils/res";
import getRequest from "@/libs/get-req";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";


export const config = {
	api: {
		bodyParser: false,
	},
};

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

	const { fields, files } = await getRequest(req, "./public/user");
	const {
		email,
		password,
		nik,
		alamat,
		tanggal_lahir,
		jenis_kelamin,
		nama,
		no_hp,
	} = fields;
	const { foto_wajah, foto_wajah_ktp } = files;
	if (
		!no_hp ||
		!email ||
		!password ||
		!nik ||
		!alamat ||
		!tanggal_lahir ||
		!jenis_kelamin ||
		!foto_wajah ||
		!foto_wajah_ktp ||
		!nama
	)
		return res.status(400).json({
			...error,
			message: "Request body is not valid / some missing",
		});

	// * check available email
	const checkEmailUser = await prisma.table_user.findMany({
		where: { email },
	});
	const checkEmailUserPenitipan = await prisma.table_user_penitipan.findMany({
		where: { email },
	});
	if (checkEmailUser.length > 0 || checkEmailUserPenitipan.length > 0)
		return res.status(406).json({
			...error,
			error_status: 406,
			message: "Email has already used for other account",
		});

	// * generate password
	const salt = bcrypt.genSaltSync(10);
	const passwordHash = bcrypt.hashSync(password, salt);

	switch (role) {
		case "user":
			const addUser = await prisma.table_user.create({
				data: {
					nama: nama,
					email: email,
					password: passwordHash,
					detail_user: {
						create: [
							{
								no_ktp: nik,
								no_telp: no_hp,
								alamat: alamat,
								tanggal_lahir: `${tanggal_lahir}T14:21:00+02:00`,
								url_foto_selfie_ktp: foto_wajah_ktp.path,
								status_akun: "terverifikasi",
								jenis_kelamin: jenis_kelamin,
								url_foto_wajah: foto_wajah.path,
							},
						],
					},
				},
			});
			const addedUser = await prisma.table_user.findFirst({
				where: { id_user: addUser.id_user },
				include: { detail_user: true },
			});
			return res.status(200).json({
				...succes,
				message: "Register user succesfully",
				data: addedUser,
			});

		case "user_penitipan":
			const addUserPenitipan = await prisma.table_user_penitipan.create({
				data: {
					nama: nama,
					email: email,
					password: passwordHash,
					detail_user_penitipan: {
						create: [
							{
								no_ktp: nik,
								no_telp: no_hp,
								alamat: alamat,
								tanggal_lahir: `${tanggal_lahir}T14:21:00+02:00`,
								url_foto_selfie_ktp: foto_wajah_ktp.path,
								status_akun: "belum_terverifikasi",
								jenis_kelamin: jenis_kelamin,
								url_foto_wajah: foto_wajah.path,
							},
						],
					},
				},
			});

			const addedUserPenitipan =
				await prisma.table_user_penitipan.findFirst({
					where: { id_user_penitipan: addUserPenitipan.id_user_penitipan },
					include: { detail_user_penitipan: true },
				});
			return res.status(200).json({
				...succes,
				message: "Register user penitipan succesfully",
				data: addedUserPenitipan,
			});

		default:
			return res.status(400).json({
				...error,
				message: `Req query ${req.query} not valid`,
			});
	}
}