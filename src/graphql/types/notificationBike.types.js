import gql from 'graphql-tag'

const notificationBikeType = gql`
    enum BikeStatus {
        ACTIVE
        STOLEN
        LOSS
    }
   
    type NotificationBike {
        id: ID!
        notificationBike: Bike
        user: User
        notification: Notification 
        invoice: Invoice
        isGlobal: Boolean
        location: JSON
        date: DateTime
        description: String
        files: [JSON]
    }

    input InputNotificationType {
        BIKE_STOLEN
        BIKE_RECOVERED
        BIKE_LOST
    }

    input CreateNotificationBikeInput {
        bikeId: ID!
        type: InputNotificationType!
        includeInvoice: Boolean
        isGlobal: Boolean
        location: JSON
        date: DateTime!
        description: String
        files: [JSON]
    }


    input UpdateNotificationBikeInput {
        id: ID!
        type: InputNotificationType!
        includeInvoice: Boolean
        isGlobal: Boolean
        location: JSON
        date: DateTime
        description: String
        files: [JSON]
    }

    type BikeConnection {
        length: Int!
        pages: Int!
        rows: [Bike]!
    }

    type Query {
        notificationBikes(page: Int = 1, limit: Int = 20): BikeConnection!,
        notificationBike(notificationBikeId:  ID!): Bike!
    }

    type Mutation {
        createNotificationBike(input: CreateNotificationBikeInput!): NotificationBike
        updateNotificationBike(input: UpdateNotificationBikeInput!): NotificationBike
        deleteNotificationBike(notificationBikeId:  ID!): NotificationBike
    }
`

export { notificationBikeType };