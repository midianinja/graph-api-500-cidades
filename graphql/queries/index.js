// models
import userQuery from './user.query';
import addressQuery from './address.query';
import newsLetterQuery from './newsLetter.query';

export default `
  type Query {
    ${userQuery}
    ${addressQuery}
    ${newsLetterQuery}
  }
`;
