import gql from 'graphql-tag'

const notificationType = gql`
    enum NotificationImportance {
        ACTIVE
        STOLEN
        LOSS
    }

    enum NotificationType {
        BIKE_STOLEN
        BIKE_RECOVERED
        BIKE_LOST
    }

    type Notification {        
        type: NotificationType
        importance: NotificationImportance
    }
`

export { notificationType };