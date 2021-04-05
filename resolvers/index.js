const Mutation = require('./mutation');
const Query = require('./Query');
const Relation = require('./Relation');

module.exports = {
	Mutation,
	Query,
	...Relation
};
