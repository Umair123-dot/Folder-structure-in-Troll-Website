const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { APP_SECRET, getUserId, getTokenPayload } = require('../../utils');
const { ApolloError } = require('apollo-server-errors');

module.exports = {
	post: async (parent, { url, status, ...data }, context, info) => {
		const authHeader = context.req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace('Bearer ', '');
			const { userId } = getTokenPayload(token);
			const user = await prisma.user.findUnique({ where: { id: userId } });
			if (user) {
				data.user = {
					connect: {
						id: user.id
					}
				};
			}
		}

		data.status = 'APPROVED';
		const myURL = new URL(url);
		data.url = myURL.host;
		const checkUrl = await prisma.website.findUnique({
			where: {
				url: data.url
			}
		});
		if (checkUrl) {
			throw new Error('Website already exist');
		}
		console.log(data);
		const website = await prisma.website.create({
			data
		});
		return website;
	},

	updateStatus: async (parents, { id, ...data }, context, info) => {
		const { admin } = context.req;
		if (!admin) throw new Error('You are not an Admin');

		const website = await prisma.website.findUnique({
			where: {
				id
			}
		});
		if (!website) throw new ApolloError('Website not found...');
		if (website.status !== 'APPROVED')
			throw new ApolloError('This website is already approved/rejected...');

		if (website.status == 'REJECTED') {
			const user = await prisma.user.findUnique({
				where: {
					id: website.userId
				}
			});
			await prisma.website.update({
				where: {
					id: website.id
				},
				data: {
					message: 'This User Website is already exit'
				}
			});
		}

		if (website.userId && data.status === 'APPROVED') {
			const user = await prisma.user.findUnique({
				where: {
					id: website.userId
				}
			});
			await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					coins: user.coins + 5
				}
			});
		}
		return prisma.website.update({
			where: {
				id
			},
			data
		});
	}
};
