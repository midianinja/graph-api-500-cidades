export default `
  createUser(
    user: UserInput!
  ): User

  updateUser(
    user_id: ID!
    user: UserInput!
  ): User
`;
