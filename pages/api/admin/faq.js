import prisma from "@/libs/prisma";
import { succes, error } from "@/utils/res";
import { authApi } from "@/middlewares/authApi";

async function handler (req, res) {
    switch (req.method) {
        case 'GET':
            const selectFaq = await prisma.faq_admin.findMany();
            return res.status(200).json({
                ...succes,
                message: "Select all faq succesfully",
                data: selectFaq
            });
            
        case 'POST':
            const {id: insertId} = await authApi(req, res, "admin");
            const {pertanyaan: insertPertanyaan, jawaban: insertJawaban} = req.body;
            if (!insertPertanyaan || !insertJawaban) return res.status(400).json({
                ...error,
                message: "Request body is not valid"
            })
            try {
                const insert = await prisma.faq_admin.create({
                    data: {
                        id_admin: parseInt(insertId),
                        pertanyaan: insertPertanyaan,
                        jawaban: insertJawaban
                    }
                });
                return res.status(200).json({
                    ...succes,
                    message: "Create faq succesfully",
                    data: insert
                });
            }
            catch (err) {
                return res.status(406).json({
                    ...error,
                    error_status: 406,
                    message: err
                })
            }
            
        case 'PUT':
            const {id: upId} = await authApi(req, res, "admin");
            const {idFaq: upIdFaq} = req.query;
            if (!upIdFaq) return res.status(404).json({
                ...error,
                error_status: 404,
                message: "Request query not valid"
            });
            const {pertanyaan: upPertanyaan, jawaban: upJawaban} = req.body;
            if (!upPertanyaan || !upJawaban) return res.status(400).json({
                ...error,
                message: "Request body is not valid"
            });
            try {
                const update = await prisma.faq_admin.update({
                    where: {id_faq: parseInt(upIdFaq)},
                    data: {
                        id_admin: parseInt(upId),
                        pertanyaan: upPertanyaan,
                        jawaban: upJawaban
                    }
                });
                return res.status(200).json({
                    ...succes,
                    message: "Update faq succesfully",
                    data: update
                })
            }
            catch(err) {
                return res.status(406).json({
                    ...error,
                    error_status: 406,
                    message: err
                })
            }

        case 'DELETE':
            const auth = await authApi(req, res, "admin");
            const {idFaq: delIdFaq} = req.query;
            const deleteFaq = await prisma.faq_admin.delete({
                where: {id_faq: parseInt(delIdFaq)}
            });
            return res.status(200).json({
                ...succes,
                message: 'Delete faq succesfully',
                data: deleteFaq
            });
        default:
            return res.status(405).json({
                ...error,
                error_status: 405,
                message: `req method ${req.method} not available`
            });
    }
}

export default handler;