import { succes, error } from "@/utils/res";
import prisma from "@/libs/prisma";
import { authApi, defaultAuthApi } from "@/middlewares/authApi";


export default async function handler(req, res) {
	switch (req.method) {
		case "GET":
			const auth = await defaultAuthApi(req, res);
			switch (auth.role) {
				case "user":
					const {jenis} = req.query;
					switch(jenis) {
						case "kucing":
							const transactionKucing = await prisma.transaksi.findMany({
								where: { id_user: auth.id, jenis_hewan: "Kucing" },
								include: {
									table_user: true,
									table_user_penitipan: {
										include: {
											detail_user_penitipan: true,
										},
									},
								},
							});
							
							const filterTransactionKucing = transactionKucing.map(
								(transaction) => {
									const {
										id_transaksi,
										nama_hewan,
										jenis_hewan,
										jenis_kelamin_hewan,
										status_penitipan,
										table_user: { nama },
									} = transaction;
									const { no_telp } =
										transaction.table_user_penitipan
											.detail_user_penitipan[0];
									return {
										id_transaksi,
										nama_penitip: nama,
										nama_hewan,
										jenis_hewan,
										jenis_kelamin_hewan,
										status_penitipan,
										no_telp_tempat_penitipan: no_telp,
									};
								}
							);
							return res.status(200).json({
								...succes,
								message: "Get all transaction kucing for user succes",
								data: filterTransactionKucing,
							});
						case "anjing":
							const transactionAnjing = await prisma.transaksi.findMany({
								where: { id_user: auth.id, jenis_hewan: "Anjing" },
								include: {
									table_user: true,
									table_user_penitipan: {
										include: {
											detail_user_penitipan: true,
										},
									},
								},
							});
							const filterTransaction = transactionAnjing.map(
								(transaction) => {
									const {
										id_transaksi,
										nama_hewan,
										jenis_hewan,
										jenis_kelamin_hewan,
										status_penitipan,
										table_user: { nama },
									} = transaction;
									const { no_telp } =
										transaction.table_user_penitipan
											.detail_user_penitipan[0];
									return {
										id_transaksi,
										nama_penitip: nama,
										nama_hewan,
										jenis_hewan,
										jenis_kelamin_hewan,
										status_penitipan,
										no_telp_tempat_penitipan: no_telp,
									};
								}
							);
							return res.status(200).json({
								...succes,
								message: "Get all transaction anjing for user succes",
								data: filterTransaction,
							});
						default:
							return res.status(400).json({
								...error,
								message: "Jenis hewan not valid"
							})
					}
				
				case "user_penitipan":
					const userPenitipanTransaction =
						await prisma.transaksi.findMany({
							where: { id_tempat_penitipan: auth.id },
							include: {
								table_user: true,
								table_user_penitipan: {
									include: {
										detail_user_penitipan: true,
									},
								},
							},
						});
					const filterTransactionUserPenitipan =
						userPenitipanTransaction.map((transaction) => {
							const {
								id_transaksi,
								nama_hewan,
								jenis_hewan,
								jenis_kelamin_hewan,
								status_penitipan,
								table_user: { nama },
							} = transaction;
							const { no_telp } =
								transaction.table_user_penitipan
									.detail_user_penitipan[0];
							return {
								id_transaksi,
								nama_penitip: nama,
								nama_hewan,
								jenis_hewan,
								jenis_kelamin_hewan,
								status_penitipan,
								no_telp_tempat_penitipan: no_telp,
							};
						});
					return res.status(200).json({
						...succes,
						message:
							"Get all transaction for user_penitipan succes",
						data: filterTransactionUserPenitipan,
					});
				case "admin":
					const allTransaction = await prisma.transaksi.findMany();
					return res.status(200).json({
						...succes,
						message: "Get all transaction succes",
						data: allTransaction,
					});
				default:
					return res.status(403).json({
						...error,
						error_status: 403,
						message: "Role not valid",
					});
			}
		case "POST":
			const authPost = await authApi(req, res, "user");
			const { id: idUserPenitipan } = req.query;
			if (!idUserPenitipan)
				return res.status(400).json({
					...error,
					message: "Must send request query id user penitipan",
				});
			const {
				nama_hewan,
				jenis_hewan,
				jenis_kelamin_hewan,
				umur,
				tanggal_penitipan,
				tanggal_pengembalian,
				info_tambahan,
			} = req.body;
			if (
				!nama_hewan ||
				!jenis_hewan ||
				!jenis_kelamin_hewan ||
				!umur ||
				!tanggal_penitipan ||
				!tanggal_pengembalian ||
				!info_tambahan
			)
				return res.status(400).json({
					...error,
					message: "Request body not valid / some missing",
				});
			const create = await prisma.transaksi.create({
				data: {
					nama_hewan,
					jenis_hewan,
					jenis_kelamin_hewan,
					umur: parseInt(umur),
					tanggal_penitipan: `${tanggal_penitipan}T14:21:00+02:00`,
					tanggal_pengembalian: `${tanggal_pengembalian}T14:21:00+02:00`,
					info_tambahan,
					status_penitipan: "Pending",
					id_user: authPost.id,
					id_tempat_penitipan: parseInt(idUserPenitipan),
				},
			});
			return res.status(200).json({
				...succes,
				message: "Create new transaction succesfully",
				data: create,
			});
		case "PUT":
			const authPut = await defaultAuthApi(req, res);
			const { action, id_transaksi } = req.query;
			if (!action)
				return res.status(400).json({
					...error,
					message: "Must send request query action",
				});
			if (!id_transaksi)
				return res.status(400).json({
					...error,
					message: "Must send request query id_transaksi",
				});
			switch (action) {
				case "decline":
					const declineTransaction = await prisma.transaksi.update({
						where: { id_transaksi: parseInt(id_transaksi) },
						data: {
							status_penitipan: "Decline",
						},
					});
					return res.status(200).json({
						...succes,
						message: "Decline transaction succesfully",
						data: declineTransaction,
					});
				case "accepted":
					const acceptTransaction = await prisma.transaksi.update({
						where: { id_transaksi: parseInt(id_transaksi) },
						data: {
							status_penitipan: "Accepted",
						},
					});
					return res.status(200).json({
						...succes,
						message: "Accept transaction succesfuly",
						data: acceptTransaction,
					});
				default:
					return res.status(400).json({
						...error,
						message: "Action in request query not allowed",
					});
			}
		case "DELETE":
			const adminAuth = await authApi(req, res, "admin");
			const { id_transaksi: delIdTransaksi } = req.query;
			if (!delIdTransaksi)
				return res.status(400).json({
					...error,
					message: "Must be send request query id_transaksi",
				});
			const deleteTransaction = await prisma.transaksi.delete({
				where: { id_transaksi: parseInt(delIdTransaksi) },
			});
			return res.status(200).json({
				...succes,
				message: "Delete transaction succesfully",
				data: deleteTransaction,
			});
		default:
			return res.status(405).json({
				...error,
				error_status: 405,
				message: `Request method ${req.method} not allowed`,
			});
	}
}
