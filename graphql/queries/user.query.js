export default `
  oneUser( 
    user: UserInput!
  ): User

  allUsers( 
    user: UserInput!
    paginator: PaginatorInput
  ): [User]

  searchUser( 
    key_word: String!
  ): [User]
`;
