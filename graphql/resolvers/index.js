import users from './user.resolver';
import address from './address.resolver';


export default {
  Query: {
    ...users.queries,
    ...address.queries,
  },
  Mutation: {
    ...users.mutations,
    ...address.mutations,
  },
};
