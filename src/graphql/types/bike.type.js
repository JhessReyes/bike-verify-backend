import gql from 'graphql-tag'

const bikeType = gql`
    enum BikeStatus {
        ACTIVE
        STOLEN
        LOSS
    }

    type Bike {
        id: ID!
        name: String
        model: String
        brand: String
        serialNo: String
        year: String
        status: BikeStatus
        description: String
        invoice: Invoice
        files: [JSON]
    }

    input InvoiceInput {
        nameStore: String
        address: String
        location: JSON
        date: String
        description: String
        files: [JSON]
    }

    input CreateBikeInput {
        invoice: InvoiceInput
        name: String
        model: String!
        brand: String
        serialNo: String
        year: String
        status: BikeStatus
        description: String
        files: [JSON]
    }

    input UpdateBikeInput {
        id: ID!
        invoice: InvoiceInput
        name: String
        model: String
        brand: String
        serialNo: String
        year: String
        status: BikeStatus
        description: String
        files: [JSON]
    }

    type BikeConnection {
        length: Int!
        pages: Int!
        rows: [Bike]!
    }

    type Query {
        bikes(page: Int = 1, limit: Int = 20): BikeConnection!,
        bike(bikeId:  ID!): Bike!
    }

    type Mutation {
        createBike(input: CreateBikeInput!): Bike
        updateBike(input: UpdateBikeInput!): Bike
        deleteBike(bikeId:  ID!): Bike
    }
`

export { bikeType };