export default `
  type Address {
    id: ID
    street: String
    complement: String
    district: String
    city: String
    number: String
    zipcode: String
    state: String
    country: String
    place_id: String
    geometry: JSON
    latitude: Float
    longitude: Float
    user: User
  }
  
  input AddressInput {
    id: ID
    street: String
    complement: String
    district: String
    city: String
    number: String
    zipcode: String
    state: String
    country: String
    place_id: String
    geometry: JSON
    latitude: Float
    longitude: Float
    user: String
  }
`;
