import { gql } from '@apollo/client';
const addCart = gql(`
mutation AddCart($productId: String!) {
    addCart(productId: $productId) {
      _id
      productId
      count
    }
  }`);

export { addCart };
