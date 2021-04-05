const { gql } = require('apollo-server-express');

module.exports = gql`
	type User {
		id: Int!
		email: String!
		name: String!
		password: String!
		phoneNumber: String!
		gender: String
		coins: Int
		websites(status: String): [Website]
	}

	type AuthUser {
		token: String!
		user: User!
	}

	extend type Query {
		users: [User!]!
		loggedInUser: User! @auth
		user(id: Int!): User!
	}
	extend type Mutation {
		signUp(
			email: String!
			name: String!
			password: String!
			phoneNumber: String!
			gender: String
		): AuthUser!
		login(email: String!, password: String!): AuthUser!
		deleteUser(id: Int!): String!
	}
`;
