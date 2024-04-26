import { ApolloServerPlugin } from '@apollo/server';
import { GraphQLError, ResponsePath } from 'graphql';
import { AuthenticationService } from '../auth';
import { type BikeVerifyContext } from '../interfaces';
import jwt from 'jwt-simple';

function getPaths(node: ResponsePath) {
    let path = []
    for (let i: ResponsePath | undefined = node; i !== undefined; i = i.prev) {
        path.push(i.key)
    }
    return path.reverse().join('.')
}

function isValidJwt(jwtToken: string): boolean {
    const segments = jwtToken.split('.');
    return segments.length === 3;
}

export function AuthenticationPlugin(): ApolloServerPlugin<BikeVerifyContext> {
    return {
        requestDidStart: async ({ request: { http: req }, contextValue }) => {
            const authHeader = req?.headers.get('authorization');
            const authService = new AuthenticationService();
            let error: GraphQLError | undefined = undefined;
            if (authHeader) {
                const [authType, authToken] = authHeader.split(' ');
                if (authType.toLowerCase() === 'bearer') {
                    try {
                        if (!isValidJwt(authToken)) {
                            throw new Error('Invalid JWT token');
                        }
                        const decoded = jwt.decode(authToken, process.env.CLERK_JWT_ISSUER || '', true)
                        if (!decoded) error = new GraphQLError('invalid token, session not found', {
                            extensions: {
                                code: 'AUTH_INVAL_CREDENTIAL',
                            },
                        })
                        // console.log("first contextValue", decoded)
                        const decodedSession: BikeVerifyContext["session"] = await authService.verifySession(decoded)
                        // console.log("first contextValue", decodedSession)
                        contextValue.session = decodedSession;
                    } catch (e) {
                        error = new GraphQLError('invalid token, session not found', {
                            extensions: {
                                code: 'AUTH_INVAL_CREDENTIAL',
                            },
                        })
                    }
                } else {
                    error = new GraphQLError(
                        'the authorization schema must be "Bearer"',
                        {
                            extensions: { code: 'AUTH_INVAL_CREDENTIAL' },
                        }
                    )
                }
            }

            return {
                async executionDidStart({ operationName }) {
                    if (operationName === 'IntrospectionQuery') {
                        return
                    }

                    return {
                        willResolveField({ info, contextValue: { session } }) {
                            let publicRoutes = ['']
                            const paths = getPaths(info.path)
                            for (const item of publicRoutes) {
                                if (paths.startsWith(item)) {
                                    return
                                }
                            }

                            if (error) {
                                throw error
                            }

                            if (!session) {
                                throw new GraphQLError(
                                    'You need to sign in to access this resource',
                                    {
                                        extensions: {
                                            code: 'AUTH_UNAUTHENTICATED',
                                        },
                                    }
                                )
                            }
                        },
                    }
                },
            }
        }
    }
}
