import { gql } from '@apollo/client';

const orders = gql`
  query Orders {
    orders {
      _id
      createdAt
      status
      deliverType
      deliverAddress
      products
      totalPrice
      userId
    }
  }
`;

const myOrders = gql`
  query MyOrders($userId: String) {
    myOrders(userId: $userId) {
      _id
      createdAt
      status
      deliverType
      deliverAddress
      products
      totalPrice
      userId
    }
  }
`;
export { orders, myOrders };
