const admin = require('./admin');
const website = require('./website');
const user = require('./user');

const Mutation = {
	...admin,
	...website,
	...user
};

module.exports = Mutation;
