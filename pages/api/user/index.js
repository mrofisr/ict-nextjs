import { error, succes } from "@/utils/res";
import prisma from "@/libs/prisma";
import { defaultAuthApi } from "@/middlewares/authApi";

export default async function handler (req, res) {
    if (req.method !== "GET") return res.status(405).json({
        ...error,
        error_status: 405,
        message: `Request method ${req.method} not allowed`
    });
    const {id, role} = await defaultAuthApi(req, res);
    switch (role) {
        case "user":
            const getUser = await prisma.table_user_penitipan.findUnique({
                where: {
                    id_user : id
                },
                select: {
                    id_user_penitipan: true,
                    nama: true,
                    email: true
                }
            });
            return res.status(200).json({
                ...succes,
                message: "Get user succesfully",
                data: getUser
            });
        case "user_penitipan":
            const getUserPenitipan = await prisma.table_user_penitipan.findUnique({
                where: {
                    id_user_penitipan: id
                },
                select: {
                    id_user_penitipan: true,
                    nama: true,
                    email: true
                }
            });
            return res.status(200).json({
                ...succes,
                message: "Get user_penitipan succesfully",
                data: getUserPenitipan
            });
        default:
            return res.status(401).json({
                ...error,
                error_status: 401,
                message: "This role not have permisson to acces this API"
            })
    }
}