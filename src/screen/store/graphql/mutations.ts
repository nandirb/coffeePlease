import { gql } from '@apollo/client';

const login = gql(`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`);

const addProduct = gql(`
mutation addProducts(
    $categoryId: String
  ) {
    products(
      categoryId: $categoryId
      searchValue: $searchValue
    ) {
      _id
      name
      type
      description
      unitPrice
      categoryId
      category {
        _id
        name
        type
      }
      createdAt
      createdBy
    }
  }
`);

export { login, addProduct };
