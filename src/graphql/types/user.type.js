import gql from 'graphql-tag'

const userType = gql`
    type User {
        id:  ID!
        name: String!
        surname: String!
        email: String!
        phone: String
        location: JSON
        public: JSON
        private: JSON
    }

    input CreateUserInput {
        name: String!
        surname: String
        email: String!
        phone: String
        location: JSON
        public: JSON
        private: JSON
    }

    input UpdateUserInput {
        id: ID!
        name: String!
        surname: String
        email: String!
        phone: String
        location: JSON
        public: JSON
        private: JSON
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
`;

export { userType };