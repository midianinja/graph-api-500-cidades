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
    latitude: Int
    longitude: Int
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
    latitude: Int
    longitude: Int
  }
`;
