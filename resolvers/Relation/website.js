const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Website = {
	async user(parent) {
		if (!parent.userId) return null;
		return prisma.user.findUnique({
			where: {
				id: parent.userId
			}
		});
	}
};

module.exports = Website;
