import { userType } from "./user.type.js";
import gql from "graphql-tag";

const GlobalTypes = gql`
    scalar DateTime
`;

export default [GlobalTypes, userType];