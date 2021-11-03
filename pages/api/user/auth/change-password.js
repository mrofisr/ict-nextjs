import { succes, error } from "@/utils/res";
import bcrypt from 'bcryptjs';
import prisma from "@/libs/prisma";
import { authApi } from "@/middlewares/authApi";

export default async function handler (req, res) {
    if (req.method !== 'PUT') return res.status(405).json({
        ...error,
        error_status: 405,
        message: `Method ${req.method} not allowed`
    });
    const {role, id} = req.query;
    if (!role || !id) return res.status(404).json({
        ...error,
        error_status: 404,
        message: "Must be send requset query"
    });
    console.log(req.body);
    const {password, new_password, new_password_verif} = req.body;
    console.log(new_password, new_password_verif);
    if (new_password !== new_password_verif) return res.status(400).json({
        ...error,
        message: "New passsword confirmation not equal to new password"
    });

    switch (role) {
        case "user":
            const selectUser = await prisma.table_user.findFirst({
                where: {id_user: parseInt(id)}
            });
            // * check old password user
            const checkPasswordUser = bcrypt.compareSync(
			    password,
				selectUser.password
			);
			if (!checkPasswordUser)
				return res.status(404).json({
					...error,
					error_code: 404,
					message: "Wrong old password",
				});
            // * generate new password hash for new password
            const saltUser = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(new_password, saltUser);

            const changePasswordUser = await prisma.table_user.update({
                where: {id_user: parseInt(id)},
                data: {password: passwordHash}
            });

            return res.status(200).json({
                ...succes,
                message: "Change password succesfully"
            })
        case "user_penitipan":
            const selectUserPenitipan = await prisma.table_user_penitipan.findFirst({
                where: {id_user_penitipan: parseInt(id)}
            });

            // * check old password user penitipan
            const checkPasswordUserPenitipan = bcrypt.compareSync(password, selectUserPenitipan.password);
            if (!checkPasswordUserPenitipan) return res.status(404).json({
                ...error,
                error_status: 404,
                message: "Wrong old password"
            });
            // * generate new password hash for new password
            const saltUserPenitipan = bcrypt.genSaltSync(10);
            const passwordHashPentipan = bcrypt.hashSync(new_password, saltUserPenitipan);

            const changePasswordUserPentipan = await prisma.table_user_penitipan.update({
                where: {id_user_penitipan: parseInt(id)},
                data: {password: passwordHashPentipan}
            });
            return res.status(200).json({
                ...succes,
                message: "Change password succesfully"
            })
        default:
            return res.status(400).json({
                ...error,
                message: `Request query ${req.query} not valid`
            })
    }
}