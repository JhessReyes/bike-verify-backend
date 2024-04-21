import gql from 'graphql-tag'

const userType = gql`
    type Session {
        id: ID!
        type: String!
        status: Boolean!
        jwt: String!
        auth: String
    }

    type User {
        id:ID!
        name:String!
        email:String!
    }

    input CreateUserInput {
        name:String!
        email:String!
        password:String!
        planId:ID!
    }

    input UpdateUserInput {
        id:ID!
        name:String
        email:String
        password:String
        planId:ID
    }

    type UserConnection {
        length: Int!
        pages: Int!
        rows: [User]!
    }

    type Query {
        users(page: Int = 1, limit: Int = 20): UserConnection!,
        user(userId: ID!): User!
        me: User!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUser(input: UpdateUserInput!): User
        deleteUser(userId: ID!): User
    }
`;

export { userType };