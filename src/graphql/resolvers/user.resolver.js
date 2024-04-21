import { GraphQLError } from "graphql"
/* import { admin } from "../../core/firebase" */

const userResolver = {
    Query: {
        users: async (_, { page, limit }, ctx) => {
            const { User } = ctx.db
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
        user: async (_, { userId }, ctx) => {
            const { User } = ctx.db
            const result = await User.findByPk(userId);
            return result;
        },
        me: async (_, __, { session: { currentUser } }) => {
            return currentUser;
        }
    },
    Mutation: {
        createUser: async (_, args, ctx) => {
            const { User, sequelize } = ctx.db
            const { input } = args
            let user
            try {
                if (input?.password?.length < 6) {
                    return new GraphQLError('The password must be a string with at least 6 characters.', {
                        extensions: { code: 'BAD_REQUEST', value: input.password },
                    })
                }

                user = await User.findOne({
                    where: {
                        email: input.email
                    }
                })

                if (user)
                    return new GraphQLError('user already exists', {
                        extensions: { code: 'USER_EXISTS', value: input.email },
                    })
                try {
                    /* const res = await admin.auth().getUserByEmail(input.email)
                    if (res)
                        return new GraphQLError('user already exists', {
                            extensions: { code: 'USER_EXISTS', value: input.email },
                        }) */
                } catch { }
                user = await sequelize.transaction((tran) => {
                    return User.create({ ...input }, { transaction: tran })
                })
                // await admin.auth().createUser({ email: input.email, password: input.password, displayName: input.name })
            } catch (error) {
                error?.errors?.map((e) => {
                    throw new GraphQLError(e?.message, {
                        extensions: { code: e?.validatorKey.toUpperCase(), key: e?.path, origin: e?.origin, stacktrace: e },
                    })
                })
            }
            return user
        },
        updateUser: async (_, { input }, { db: { User, Plan, sequelize } }) => {
            const { name, email, id, planId } = input
            const user = await User.findOne({ where: { id: id } })
            let plan = null
            if (planId)
                plan = await Plan.findOne({ where: { id: planId } })
            try {
                name && (user.name = name)
                email && (user.email = email)
                plan && (user.planId = plan.id)
                await sequelize.transaction(async (tran) => {
                    if (user.changed()) {
                        await user.save({
                            transaction: tran,
                        })
                    }
                })
            } catch (error) {
                error.errors.map((e) => {
                    throw new GraphQLError(e?.message, {
                        extensions: { code: e?.validatorKey.toUpperCase(), key: e?.path, origin: e?.origin, stacktrace: e },
                    })
                })
            }
            return user
        },
        deleteUser: async (_, { userId }, ctx) => {
            const { User, sequelize } = ctx.db
            const user = await User.findOne({ where: { id: userId } })
            if (!user) {
                throw new GraphQLError('user not found', {
                    extensions: { code: 'NOT_FOUND', key: 'id', value: userId },
                })
            }
            try {
                await sequelize.transaction(async (tran) => {
                    await user.destroy({ transaction: tran })
                })
            } catch (error) {
                throw error
            }
            return user
        }
    },
    User: {}
}

export { userResolver };