export default `
    createAddress(
        address: AddressInput!
    ): Address
  
    updateAddress(
        address_id: ID!
        address: AddressInput!
    ): Address
`;
