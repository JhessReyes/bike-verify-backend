import { type BikeVerifyContext } from './../interfaces';
import { GraphQLError } from 'graphql';
import { User } from '../../database/server';
import { IAuthenticationService } from './../interfaces';

class AuthenticationService implements IAuthenticationService {
    verifySession = async (decoded: any): Promise<BikeVerifyContext["session"]> => {
        const user = await User.findOne({ where: { clerkId: decoded?.userId } });
        if (!user)
            throw new GraphQLError('user session not found', {
                extensions: {
                    code: 'NOT_FOUND',
                },
            })
        return { currentUser: user, data: decoded }
    }
}

export { AuthenticationService };