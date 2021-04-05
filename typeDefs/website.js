const { gql } = require('apollo-server-express');

module.exports = gql`
	type Website {
		id: Int!
		url: String!
		title: String
		user: User
		message: String
		status: Status
	}

	enum Status {
		PENDING
		REJECTED
		APPROVED
	}

	extend type Query {
		websites: [Website!]!
	}
	extend type Mutation {
		post(url: String!, title: String): Website!
		updateStatus(id: Int!, status: Status!): Website! @adminAuth
	}
`;
