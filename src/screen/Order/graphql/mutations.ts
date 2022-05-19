import { gql } from '@apollo/client';

const addOrder = gql`
  mutation AddOrder(
    $deliverType: String!
    $userId: String!
    $deliverAddress: addressInput
    $totalPrice: Int
    $items: [itemInput]
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
      totalPrice
      _id
    }
  }
`;
export { addOrder };
