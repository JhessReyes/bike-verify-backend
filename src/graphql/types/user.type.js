import gql from 'graphql-tag'

const userType = gql`
    type User {
        id:  ID!
        name: String!
        surname: String!
        email: String!
        phone: String
        location: String
        public: String
        private: String
    }

    input CreateUserInput {
        name: String!
        surname: String
        email: String!
        phone: String
        location: String
        public: String
        private: String
    }

    input UpdateUserInput {
        id: ID!
        name: String!
        surname: String
        email: String!
        phone: String
        location: String
        public: String
        private: String
    }

    type UserConnection {
        length: Int!
        pages: Int!
        rows: [User]!
    }

    type Query {
        users(page: Int = 1, limit: Int = 20): UserConnection!,
        user(userId:  ID!): User!
        me: User!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUser(input: UpdateUserInput!): User
        deleteUser(userId:  ID!): User
    }
`;

export { userType };