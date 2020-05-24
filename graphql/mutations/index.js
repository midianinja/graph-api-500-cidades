import userMutation from './user.mutation';
import locationMutation from './address.mutation';
import newsLetternMutation from './newsLetter.mutation';

export default `
  type Mutation {
    ${userMutation}
    ${locationMutation}
    ${newsLetternMutation}
  }
`;
