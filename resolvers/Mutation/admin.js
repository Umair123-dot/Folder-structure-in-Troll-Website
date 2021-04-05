const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { APP_SECRET, getUserId, getTokenPayload } = require('../../utils');
const { ApolloError } = require('apollo-server-errors');

module.exports = {
	signUpAdmin: async (parents, args, context, info) => {
		const password = await bcrypt.hash(args.password, 10);
		// create Admin
		const admin = await prisma.admin.create({
			data: {
				...args,
				password
			}
		});
		console.log(admin);
		// TODO generate token
		const token = jwt.sign(
			{
				adminId: admin.id
			},
			APP_SECRET
		);
		return {
			token,
			admin
		};
	},
	loginAdmin: async (parent, args, context, info) => {
		const admin = await prisma.admin.findUnique({
			where: {
				email: args.email
			}
		});
		if (!admin) throw new Error('Admin not Found');

		const checkPassword = await bcrypt.compare(args.password, admin.password);
		if (!checkPassword) throw new Error('Invalid Password');

		//generate token
		const token = jwt.sign(
			{
				adminId: admin.id
			},
			APP_SECRET
		);
		return {
			token,
			admin
		};
	}
};
