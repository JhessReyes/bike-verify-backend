import {
    JSONObjectResolver,
    JSONResolver
} from 'graphql-scalars'
import { userResolver } from "./user.resolver.js";
import { invoiceResolver } from "./invoice.resolver.js";
export default [
    { JSONObject: JSONObjectResolver },
    { JSON: JSONResolver },
    userResolver,
    invoiceResolver
];
