import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from "../../../graphql/types/index";
import resolvers from "../../../graphql/resolvers/index";
import db from '../../../database/server.js';
import { AuthenticationService } from '../../../core/auth';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { AuthenticationPlugin } from '../../../core/plugins/AuthenticationPlugin';

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageLocalDefault(), AuthenticationPlugin()],
    introspection: true
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
        const authService = new AuthenticationService();
        return { res, req, db, authService }
    },
});

export async function GET(request) {
    return handler(request);
}

export async function POST(request) {
    return handler(request);
}
