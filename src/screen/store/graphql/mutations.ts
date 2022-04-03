import { gql } from '@apollo/client';

const login = gql(`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`);

export { login };
