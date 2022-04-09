import { gql } from '@apollo/client';
const carts = gql(`
query Carts {
    carts {
      _id
      productId
      count
    }
  }`);

export { carts };
