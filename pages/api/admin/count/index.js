import prisma from "@/libs/prisma";
import { error, succes } from "@/utils/res";
import { authApi } from "@/middlewares/authApi";

export default async function handler(req, res) {
	const auth = await authApi(req, res, "admin");
	if (req.method !== "GET")
		return res.status(405).json({
			...error,
			error_status: 401,
			message: `Method ${req.method} not allowed`,
		});
	const countAdmin = await prisma.admin.count();
	const countUser = await prisma.table_user.count();
	const countUserPenitipan = await prisma.table_user_penitipan.count();
	const countPendingStatus = await prisma.transaksi.count({
		where: { status_penitipan: "pending" },
	});
	const countApproveStatus = await prisma.transaksi.count({
		where: { status_penitipan: "approve" },
	});
	const countCancledStatus = await prisma.transaksi.count({
		where: { status_penitipan: "cancled" },
	});
	const countProccesStatus = await prisma.transaksi.count({
		where: { status_penitipan: "process" },
	});
	const countCompleteStatus = await prisma.transaksi.count({
		where: { status_penitipan: "complete" },
	});

	res.status(200).json({
		...succes,
		message: "Count all data succesfully",
		data: {
			admin: countAdmin,
			user: countUser,
			userPenitipan: countUserPenitipan,
			pending: countPendingStatus,
			approve: countApproveStatus,
			cancled: countCancledStatus,
			process: countProccesStatus,
			complete: countCompleteStatus,
		},
	});
}
