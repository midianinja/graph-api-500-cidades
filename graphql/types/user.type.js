export default `

  type User {
    id: ID
    tipology: String
    name: String
    profile_image: Image
    cover_image: Image
    biography: String
    skills: [String],
    email: String
    instagram: String
    facebook: String
    phone: String
    job: String
    site_address: String
    birth_date: String
    genre: String
    sexual_orientation: String
    race: String
    address: Address,
    search_keys: [String]
    ida_id: String
  }
  
  input UserInput {
    id: String
    tipology: String
    name: String
    profile_image: ImageInput
    cover_image: ImageInput
    biography: String
    skills: [String],
    email: String
    instagram: String
    facebook: String
    phone: String
    job: String
    site_address: String
    birth_date: String
    genre: String
    sexual_orientation: String
    race: String
    address: AddressInput
    ida_id: String
  }
`;
