
import { gql } from 'apollo-server-lambda';

import types from './types';
import queries from './queries';
import mutations from './mutations';
import resolvers from './resolvers';

const typeDefs = gql`${types.concat(queries).concat(mutations)}`;

export default { typeDefs, resolvers };
