import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsExceptions } from "../exceptions/badReq";
import { ErrorCode } from "../exceptions/root";
// Sign Up
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password, name } = req.body;
	// Validation
	let user = await prismaClient.user.findFirst({ where: { email: email } });
	if (user) {
		return next(new BadRequestsExceptions("User already exists", ErrorCode.USER_NOT_FOUND));
	}
	user = await prismaClient.user.create({
		data: {
			name,
			email,
			password: hashSync(password, 10),
		},
	});
	res.json(user);
};

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	// Validation
	let user = await prismaClient.user.findFirst({ where: { email: email } });
	if (!user) {
		return next(new BadRequestsExceptions("User does not exist", ErrorCode.USER_NOT_FOUND));
	}
	if (!compareSync(password, user.password)) {
		return next(new BadRequestsExceptions("Incorrect password", ErrorCode.INCORRECT_PASSWORD));
	}
	// Token generation
	const token = jwt.sign(
		{
			userId: user.id,
		},
		JWT_SECRET
	);
	res.json({ user, token });
};
