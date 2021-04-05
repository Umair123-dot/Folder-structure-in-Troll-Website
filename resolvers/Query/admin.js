module.exports = {
	loggedInAdmin: async (_, __, context) => {
		const { admin } = context.req;
		return admin;
	}
};
