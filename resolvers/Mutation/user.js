const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { APP_SECRET, getUserId, getTokenPayload } = require('../../utils');
const { ApolloError } = require('apollo-server-errors');

module.exports = {
	signUp: async (parents, args, context, info) => {
		const checkEmail = await prisma.user.findUnique({
			where: {
				email: args.email
			}
		});
		if (checkEmail) throw new Error('Email taken');
		const password = await bcrypt.hash(args.password, 10);
		// create User
		const user = await prisma.user.create({
			data: {
				...args,
				password
			}
		});
		// Generate tokens
		const token = jwt.sign(
			{
				userId: user.id
			},
			APP_SECRET
		);
		console.log(user);
		return {
			user,
			token
		};
	},
	login: async (parent, args, context, info) => {
		const user = await prisma.user.findUnique({
			where: {
				email: args.email
			}
		});
		if (!user) throw new Error('User not Found');

		const checkPassword = await bcrypt.compare(args.password, user.password);
		if (!checkPassword) throw new Error('Invalid Password');

		//generate token
		const token = jwt.sign(
			{
				userId: user.id
			},
			APP_SECRET
		);
		console.log(user);
		return {
			token,
			user
		};
	},
	deleteUser: async (parents, args, context, info) => {
		await prisma.user.delete({
			where: {
				id: args.id
			}
		});
		return 'User deleted';
	}
};
