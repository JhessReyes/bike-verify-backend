import gql from 'graphql-tag'

const invoiceType = gql`
    type Invoice {
        id: ID!
        userId: ID!
        bikeId: ID!
        nameStore: String
        address: String
        location: JSON
        date: String
        description: String
        files: [JSON]
    }

    input CreateInvoiceInput {
        userId: ID!
        bikeId: ID!
        nameStore: String!
        address: String!
        location: JSON!
        date: String!
        description: String
        files: [JSON]
    }

    input UpdateInvoiceInput {
        id: ID!
        userId: ID
        bikeId: ID
        nameStore: String
        address: String
        location: JSON
        date: String
        description: String
        files: [JSON]
    }

    type InvoiceConnection {
        length: Int!
        pages: Int!
        rows: [Invoice]!
    }

    type Query {
        invoices(page: Int = 1, limit: Int = 20): InvoiceConnection!,
        invoice(userId:  ID!): Invoice!
    }

    type Mutation {
        createInvoice(input: CreateInvoiceInput!): Invoice!
        updateInvoice(input: UpdateInvoiceInput!): Invoice
        deleteInvoice(userId:  ID!): Invoice
    }
`;

export { invoiceType };