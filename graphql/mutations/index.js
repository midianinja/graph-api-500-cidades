import userMutation from './user.mutation';
import locationMutation from './address.mutation';

export default `
  type Mutation {
    ${userMutation}
    ${locationMutation}
  }
`;
