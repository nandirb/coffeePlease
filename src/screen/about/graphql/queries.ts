import { gql } from '@apollo/client';

const currentUser = gql(`
query CurrentUser {
    currentUser {
      _id
      fullName
      email
      phoneNumber
      avatar
      address
      point
      reward
    }
  }
`);

const userDetail = gql`
  query userDetail($_id: String) {
    userDetail(_id: $_id) {
      _id
      fullName
      email
      phoneNumber
      avatar
      address
      point
      reward
    }
  }
`;

export { currentUser, userDetail };
