const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
	websites: async () => {
		const urls = await prisma.website.findMany();
		return urls;
	}
};
