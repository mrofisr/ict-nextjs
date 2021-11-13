import { authApi } from "@/middlewares/authApi";
import prisma from "@/libs/prisma";
import { succes, error } from "@/utils/res";

export default async function handler (req, res) {
    if (req.method !== "GET") return res.status(405).json({
        ...error,
        error_message: 405,
        message: `Request method ${req.method} not alowed`
    });
    const { id } = await authApi(req, res, "user_penitipan");
    const validation = await prisma.detail_tempat_penitipan.findFirst({
        where: {
            id_user_tempat_penitipan: id
        },
        select: {
            id_detail_tempat_penitipan: true
        }
    });
    const valRes = !validation ? false: true;
    const id_detail_tempat_penitipan = !validation ? false : validation.id_detail_tempat_penitipan
    console.log(valRes);
    return res.status(200).json({
        ...succes,
        message: "Get validation account for user_penitipan succesfully",
        data: {
            validation: valRes,
            id_detail_tempat_penitipan
        }
    })
}