
import { GraphQLError } from "graphql"

const notificationBikeResolver = {
    Query: {
        notificationBikes: async (_, { page, limit }, { session: { currentUser } }) => {
            if (page < 1) page = 1
            if (limit < 1) limit = 20

            let result = {}
            const rows = await currentUser.getNotificationBikes({
                limit: limit,
                offset: (page - 1) * limit,
            })
            const count = rows?.length
            result.length = count
            result.rows = rows

            let pages = 1
            if (limit > 0) {
                pages = Math.ceil(count / limit)
            } else if (limit === 0) pages = 0
            result.pages = pages

            return result
        },
        notificationBike: async (_, { notificationBikeId }, { db: { NotificationBike } }) => {
            return await NotificationBike.findByPk(notificationBikeId);
        },
    },
    Mutation: {
        createNotificationBike: async (_, { input },
            {
                db: { NotificationBike, Bike, sequelize },
                session: { currentUser }
            }
        ) => {
            let notificationBike
            try {
                notificationBike = await sequelize.transaction(async (tran) => {
                    const notify = Notification.findOne({ where: { type } })

                    if (!notify) {
                        throw new ApolloError(
                            `Notification with type: ${type} not found`,
                            'NOT_FOUND'
                        )
                    }

                    return await NotificationBike.create({
                        ...input,
                        userId: currentUser.id,
                        notificationId: notify.id
                    }, {
                        transaction: tran
                    })
                })

            } catch (error) {
                error?.errors?.map((e) => {
                    throw new GraphQLError(e?.message, {
                        extensions: { code: e?.validatorKey.toUpperCase(), key: e?.path, origin: e?.origin, stacktrace: e },
                    })
                })
            }
            return notificationBike
        },
        updateNotificationBike: async (_, { input }, { db: { NotificationBike, Invoice, sequelize } }) => {
            const { id, type } = input
            let data = await NotificationBike.findByPk(id)
            if (!data)
                throw new ApolloError(
                    `NotificationBike with id: ${id} not found`,
                    'NOT_FOUND'
                )

            try {
                data = await sequelize.transaction(async (tran) => {
                    const notify = Notification.findOne({ where: { type } })

                    if (!notify) {
                        throw new ApolloError(
                            `Notification with type: ${type} not found`,
                            'NOT_FOUND'
                        )
                    }

                    return await NotificationBike.update({
                        ...input,
                        notificationId: notify.id
                    }, {
                        transaction: tran
                    })
                })

            } catch (error) {
                throw error
            }
            return data
        },
        deleteNotificationBike: async (_, { notificationBikeId }, { db: { NotificationBike } }) => {
            let data = await NotificationBike.findByPk(notificationBikeId)
            if (!data)
                throw new ApolloError(
                    `NotificationBike with id: ${notificationBikeId} not found`,
                    'NOT_FOUND'
                )
            await data.destroy()
            return data
        }
    },
    NotificationBike: {}
}

export { notificationBikeResolver };