import prisma from "@/libs/prisma";
import { succes, error } from "@/utils/res";
import { authApi } from "@/middlewares/authApi";

export default async function handler (req, res) {
    if (req.method !== "GET") return res.status(405).json({
        ...error,
        error_status: 405,
        message: `Request method ${req.method} not allowed`
    });
    const auth = await authApi(req, res, "admin");
    const {role} = req.query;
    if (!role) return res.status(400).json({
        ...error,
        message: "Must send request query role"
    });
    switch(role) {
        case "user":
            const {id: idUser} = req.query;
            if (!idUser) return res.status(400).json({
                ...error,
                message: "Must send request query id user"
            });
            const detailUser = await prisma.table_user.findFirst({
                where: {id_user: parseInt(idUser)},
                include: {
                    detail_user: true
                }
            });
            return res.status(200).json({
                ...succes,
                message: "Get detail user succesfully",
                data: detailUser
            });
        case "user_penitipan":
            const {id: idUserPenitipan} = req.query;
            if (!idUserPenitipan) return res.status(400).json({
                ...error,
                message: "Get detail user penitipan seuccesfully"
            });
            const detailUserPenitipan = await prisma.table_user_penitipan.findFirst({
                where: {id_user_penitipan: parseInt(idUserPenitipan)},
                include: {
                    detail_user_penitipan: true
                }
            });
            return res.status(200).json({
                ...succes,
                message: "Get detaul user penitipan succesfully",
                data: detailUserPenitipan
            })
        default:
            return res.status(400).json({
                ...error,
                message: "Request query role not valid"
            });
    }
}