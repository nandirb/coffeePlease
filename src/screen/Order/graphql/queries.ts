import { gql } from '@apollo/client';

const orders = gql`
  query Orders($deliverType: String) {
    orders(deliverType: $deliverType) {
      _id
      createdAt
      status
      deliverType
      deliverAddress {
        lng
        lat
        phone
        address
      }
      totalPrice
      userId
      items {
        product {
          _id
          name
          unitPrice
          image
        }
        count
      }
    }
  }
`;

const myOrders = gql`
  query myOrders($userId: String!) {
    myOrders(userId: $userId) {
      _id
      createdAt
      status
      deliverType
      deliverAddress {
        address
        lng
        lat
        phone
      }
      totalPrice
      userId
      items {
        product {
          _id
          unitPrice
          name
          image
        }
        count
      }
    }
  }
`;
export { orders, myOrders };
