const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
	users: async () => {
		const users = await prisma.user.findMany();
		return users;
	},
	loggedInUser: async (parent, args, context, info) => {
		const { user } = context.req;
		const loginUser = await prisma.user.findUnique({
			where: { id: user.id }
		});
		return loginUser;
	},
	user: async (parent, args, context, info) => {
		const loginUser = await prisma.user.findUnique({
			where: { id: args.id }
		});
		return loginUser;
	}
};
