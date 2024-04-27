import { GraphQLError } from "graphql"

const invoiceResolver = {
    Query: {
        invoices: async (_, { page, limit }, { session: { currentUser } }) => {
            if (page < 1) page = 1
            if (limit < 1) limit = 20

            let result = {}
            const rows = await currentUser.getInvoices({
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
        invoice: async (_, { userId }, { db: { Invoice } }) => {
            return await Invoice.findByPk(userId);
        },
    },
    Mutation: {
        createInvoice: async (_, args, { db: { Invoice, sequelize } }) => {
            const { input } = args
            let invoice
            try {
                invoice = await sequelize.transaction((tran) => {
                    return Invoice.create({ ...input }, { transaction: tran })
                })

            } catch (error) {
                error?.errors?.map((e) => {
                    throw new GraphQLError(e?.message, {
                        extensions: { code: e?.validatorKey.toUpperCase(), key: e?.path, origin: e?.origin, stacktrace: e },
                    })
                })
            }
            return invoice
        },
        updateInvoice: async (_, { input }, { db: { Invoice, Plan, sequelize } }) => {
            const { name, email, id, planId } = input
            const data = await Invoice.findByPk(id)
            if (!data)
                throw new ApolloError(
                    `Invoice with id: ${id} not found`,
                    'NOT_FOUND'
                )
            await data.update(input)
            return data
        },
        deleteInvoice: async (_, { userId }, { db: { Invoice } }) => {
            let data = await Invoice.findByPk(id)
            if (!data)
                throw new ApolloError(
                    `Category with id: ${id} not found`,
                    'NOT_FOUND'
                )
            await data.destroy()
            return data
        }
    },
    Invoice: {}
}

export { invoiceResolver };