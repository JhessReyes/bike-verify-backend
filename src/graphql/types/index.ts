import {
    JSONObjectDefinition,
    JSONDefinition,
} from 'graphql-scalars'
import gql from "graphql-tag";
import { userType } from "./user.type.js";
import { invoiceType } from "./invoice.type.js";
import { bikeType } from "./bike.type.js";
import { notificationBikeType } from "./notificationBike.types.js"
import { notificationType } from "./notification.type.js"

const GlobalTypes = gql`
    scalar DateTime
`;

export default [
    GlobalTypes,
    JSONObjectDefinition,
    JSONDefinition,
    userType,
    invoiceType,
    bikeType,
    notificationBikeType,
    notificationType
];