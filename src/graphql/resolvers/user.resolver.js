
const userResolver = {
    Query: {
        users: async (_, { page, limit }, { session: { currentUser, data }, db: { User } }) => {
            if (!currentUser) throw new Error('Unauthorized')
            if (!data?.metadata?.isAdmin) throw new Error('Unauthorized')
            if (page < 1) page = 1
            if (limit < 1) limit = 20

            let result = {}
            const { count, rows } = await User.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit
            })
            result.length = count
            result.rows = rows

            let pages = 1
            if (limit > 0) {
                pages = Math.ceil(count / limit)
            } else if (limit === 0) pages = 0
            result.pages = pages

            return result
        },
        user: async (_, { userId }, { db: { User } }) => {
            return await User.findByPk(userId);
        },
        me: async (_, __, { session: { currentUser } }) => {
            return currentUser;
        }
    },
    Mutation: {},
    User: {}
}

export { userResolver };