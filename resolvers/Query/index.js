const admin = require('./admin');
const website = require('./website');
const user = require('./user');

const Query = {
	...admin,
	...website,
	...user
};

module.exports = Query;
