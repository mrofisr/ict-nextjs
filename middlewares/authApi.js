import jwt from "jsonwebtoken";
import { error } from "@/utils/res";

export function authApi(req, res, role) {
	return new Promise((resolve) => {
		const { authorization } = req.headers;
		if (!authorization) return res.status(401).json({
			...error,
			error_status: 401,
			message: "Must be send authorization in request headers"
		});
		const splitToken = authorization.split(" ");
		const [tokenType, token] = splitToken;
		if (tokenType !== "Bearer")
			return res.status(401).json({
				...error,
				error_status: 401,
				message: "Token type not allowed",
			});
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err || decoded.role !== role)
				return res.status(401).json({
					...error,
					error_status: 401,
					message: "Token is not valid",
				});
			return resolve(decoded);
		});
	});
}

export function defaultAuthApi(req, res) {
	return new Promise((resolve) => {
		const { authorization } = req.headers;
		const splitToken = authorization.split(" ");
		const [tokenType, token] = splitToken;
		if (tokenType !== "Bearer")
			return res.status(401).json({
				...error,
				error_status: 401,
				message: "Token type not allowed",
			});
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err)
				return res.status(401).json({
					...error,
					error_status: 401,
					message: "Token is not valid",
				});
			return resolve(decoded);
		});
	});
}
