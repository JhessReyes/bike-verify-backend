import { type BikeVerifyContext } from './../interfaces';
import { GraphQLError } from 'graphql';
import { User, sequelize } from '../../database/server';
import { IAuthenticationService } from './../interfaces';

class AuthenticationService implements IAuthenticationService {
    verifySession = async (decoded: any): Promise<BikeVerifyContext["session"]> => {
        let user = undefined
        try {

            user = await sequelize.transaction(async (t: any) => {
                let user = await User.findOne({ where: { clerkId: decoded?.userId }, transaction: t });

                if (!user) {
                    user = await User.create({
                        name: decoded?.name,
                        surname: decoded?.surname,
                        clerkId: decoded?.userId,
                        email: decoded?.email,
                        phone: decoded?.phone,
                    }, { transaction: t })
                }

                console.log("USER", user.toJSON(), "DECODED", decoded)
                return user
            })

            if (!user)
                throw new GraphQLError('user session not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                })
        } catch (error) {
            console.log("ERROR", error)
        }

        return { currentUser: user, data: decoded }
    }
}

export { AuthenticationService };