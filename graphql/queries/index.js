// models
import userQuery from './user.query';
import addressQuery from './address.query';

export default `
  type Query {
    ${userQuery}
    ${addressQuery}
  }
`;
