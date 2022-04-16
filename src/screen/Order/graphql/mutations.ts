import { gql } from '@apollo/client';

const addOrder = gql`
  mutation AddOrder(
    $deliverType: String!
    $userId: String!
    $deliverAddress: addressInput
    $totalPrice: Int
    $items: [productInput]
  ) {
    addOrder(
      deliverType: $deliverType
      userId: $userId
      deliverAddress: $deliverAddress
      totalPrice: $totalPrice
      items: $items
    ) {
      items {
        product {
          _id
          name
          unitPrice
          image
        }
        count
      }
      status
      totalPrice
      _id
    }
  }
`;
export { addOrder };
