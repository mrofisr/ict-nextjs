import { succes, error } from "@/utils/res";
import prisma from "@/libs/prisma";
import { authApi } from "@/middlewares/authApi";

export default async function handler(req, res) {
	const auth = await authApi(req, res, "admin");
	const { role } = req.query;
	switch (req.method) {
		case "GET":
			switch (role) {
				case "user":
					// * select all user where status account belum_terverifikasi
					const selectUser = await prisma.detail_user.findMany({
						where: { status_akun: "belum_terverifikasi" },
						include: {
							table_user: true,
						},
					});
					// * Filtering value in array of object form selectUser
					const selectUserFiltered = selectUser.map((user) => {
						const {
							id,
							table_user: { id_user, nama, email },
						} = user;
						return { id, user: { id_user, nama, email } };
					});
					return res.status(200).json({
						...succes,
						message:
							"Select all user where account not acceptable succesfully",
						data: selectUserFiltered,
					});
				case "user_penitipan":
					// * select all user penitipan where status account belum_terverifikasi
					const selectUserPenitipan =
						await prisma.detail_user_penitipan.findMany({
							where: { status_akun: "belum_terverifikasi" },
							include: { table_user_penitipan: true },
						});
					// * Filtering value in array of object form selectUserPenitipan
					const selectUserPenitipanFiltered = selectUserPenitipan.map(
						(user) => {
							const {
								id,
								table_user_penitipan: {
									id_user_penitipan,
									nama,
									email,
								},
							} = user;
							return {
								id,
								user_penitipan: {
									id_user_penitipan,
									nama,
									email,
								},
							};
						}
					);
					return res.status(200).json({
						...succes,
						message:
							"Select all user  penitipan where account not acceptable succefully",
						data: selectUserPenitipanFiltered,
					});
				default:
					return res.status(400).json({
						...error,
						message: `Req query not valid`,
					});
			}

		case "PUT":
			switch (role) {
				case "user":
					const { id: upUserId } = req.query;
					if (!upUserId)
						return res.status(400).json({
							...error,
							message: "Must send request query id detail user",
						});
					// * update status akun user
					const updateStatusUser = await prisma.detail_user.update({
						where: { id: parseInt(upUserId) },
						data: { status_akun: "terverifikasi" },
						select: {
							id: true,
							id_detail_user: true,
							status_akun: true,
						},
					});
					return res.status(200).json({
						...succes,
						message: "Update status user succesfully",
						data: updateStatusUser,
					});
				case "user_penitipan":
					const { id: upUserPenitipanId } = req.query;
					if (!upUserPenitipanId)
						return res.status(400).json({
							...error,
							message:
								"Must send request query id detail user penitipan",
						});
					// * update status akun user penitipan
					const updateStatusUserPenitipan =
						await prisma.detail_user_penitipan.update({
							where: { id: parseInt(upUserPenitipanId) },
							data: { status_akun: "terverifikasi" },
							select: {
								id: true,
								id_detail_user_penitipan: true,
								status_akun: true,
							},
						});
					return res.status(200).json({
						...succes,
						message: "Update status user penitipan succefully",
						data: updateStatusUserPenitipan,
					});
				default:
					return res.status(400).json({
						...error,
						message: "Req query not valid",
					});
			}

		case "DELETE":
			switch (role) {
				case "user":
					const { id: delUser } = req.query;
					if (!delUser)
						return res.status(400).json({
							...error,
							message: "Must send req query id table user",
						});
					// * delete user account
					const deleteUser = await prisma.table_user.delete({
						where: { id_user: parseInt(delUser) },
						select: {
							id_user: true,
							nama: true,
							email: true,
						},
					});
					return res.status(200).json({
						...succes,
						message: "Delete user succesfully",
						data: deleteUser,
					});
				case "user_penitipan":
					const { id: delUserPenitipan } = req.query;
					// * delete user penitipan account
					const deleteUserPenitipan =
						await prisma.table_user_penitipan.delete({
							where: {
								id_user_penitipan: parseInt(delUserPenitipan),
							},
							select: {
								id_user_penitipan: true,
								nama: true,
								email: true,
							},
						});
					return res.status(200).json({
						...succes,
						message: "Delete user penitipan succefully",
						data: deleteUserPenitipan,
					});
				default:
					return res.status(400).json({
						...error,
						message: "Request query not valid",
					});
			}
		default:
			return res.status(405).json({
				...error,
				error_status: 405,
				message: `Method ${req.method} not allowed`,
			});
	}
}
