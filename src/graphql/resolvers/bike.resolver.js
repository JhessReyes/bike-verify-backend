import { GraphQLError } from "graphql"

const bikeResolver = {
    Query: {
        bikes: async (_, { page, limit }, { session: { currentUser } }) => {
            if (page < 1) page = 1
            if (limit < 1) limit = 20

            let result = {}
            const rows = await currentUser.getBikes({
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
        bike: async (_, { userId }, { db: { Bike } }) => {
            return await Bike.findByPk(userId);
        },
    },
    Mutation: {
        createBike: async (_, { input }, { db: { Bike, Invoice, sequelize }, session: { currentUser } }) => {
            const { invoice } = input
            let bike
            try {
                bike = await sequelize.transaction(async (tran) => {
                    if (invoice) {
                        input.invoice.userId = currentUser.id
                    }
                    return await Bike.create({ ...input, userId: currentUser.id }, {
                        include: [
                            { model: Invoice, as: 'invoice' }
                        ],
                        transaction: tran
                    })
                })

            } catch (error) {
                console.log("first error", error)
                error?.errors?.map((e) => {
                    throw new GraphQLError(e?.message, {
                        extensions: { code: e?.validatorKey.toUpperCase(), key: e?.path, origin: e?.origin, stacktrace: e },
                    })
                })
            }
            return bike
        },
        updateBike: async (_, { input }, { db: { Bike, sequelize } }) => {
            const { id, invoice } = input
            let data = await Bike.findByPk(id)
            if (!data)
                throw new ApolloError(
                    `Bike with id: ${id} not found`,
                    'NOT_FOUND'
                )

            try {
                data = await sequelize.transaction(async (tran) => {
                    let d = await data.update({ ...input }, { transaction: tran })

                    if (invoice) {
                        const i = await data.getInvoice({ transaction: tran })
                        d.invoice = await i.update({ ...invoice }, { transaction: tran })
                    }

                    return d
                })

            } catch (error) {
                throw error
            }
            return data
        },
        deleteBike: async (_, { bikeId }, { db: { Bike } }) => {
            let data = await Bike.findByPk(bikeId)
            if (!data)
                throw new ApolloError(
                    `Bike with id: ${bikeId} not found`,
                    'NOT_FOUND'
                )
            await data.destroy()
            return data
        }
    },
    Bike: {}
}

export { bikeResolver };