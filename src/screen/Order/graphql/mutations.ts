import { gql } from '@apollo/client';

const addOrder = gql`
mutation AddOrder(
    $deliverType: String!, 
    $deliverAddress: String, 
    $products: [String], 
    $totalPrice: Int, 
    $userId: String!) {
    addOrder(
        deliverType: $deliverType, 
        deliverAddress: $deliverAddress, 
        products: $products, 
        totalPrice: $totalPrice, 
        userId: $userId)
  
`;
export { addOrder };
