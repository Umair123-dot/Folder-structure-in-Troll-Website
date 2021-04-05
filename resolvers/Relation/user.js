const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const User = {
	async websites(parent) {
		const where = {
			userId: parent.id
		};

		return prisma.website.findMany({ where });
	},
	async websites(parent, { status }) {
		const where = {
			userId: parent.id
		};
		if (status) where.status = status;
		return prisma.website.findMany({ where });
	}
};

module.exports = User;
