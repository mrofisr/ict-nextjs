import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { error, succes } from "@/utils/res";

export default async function handler(req, res) {
	if (req.method !== "POST")
		return res.status(405).json({
			...error,
			error_status: 405,
			message: `Method ${req.method} not allowed`,
		});
	const { nama: regNama, email: regEmail, password: regPassword } = req.body;
	if (!regNama || !regEmail || !regPassword)
		return res.status(400).json({
			...error,
			error_status: 400,
			message: "Request body is not valid",
		});

	// * check available email
	const checkEmail = await prisma.admin.findMany({
		where: {
			email: regEmail,
		},
	});
	if (checkEmail.length > 0)
		return res.status(406).json({
			...error,
			error_status: 406,
			message: "Email is already used for other account",
		});

	// * generate password hash
	const salt = bcrypt.genSaltSync(10);
	const passwordHash = bcrypt.hashSync(regPassword, salt);
	const register = await prisma.admin.create({
		data: {
			nama: regNama,
			email: regEmail,
			password: passwordHash,
		},
	});

	res.status(200);
	res.json({
		...succes,
		message: "Register admin succesfully",
		data: register,
	});
}
