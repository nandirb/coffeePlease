import { gql } from '@apollo/client';

const currentUser = gql(`
query CurrentUser {
    currentUser {
      _id
      isActive
      fullName
      email
      phoneNumber
      avatar    
      address
    }
  }
`);

const userDetail = gql`
  query userDetail($_id: String) {
    userDetail(_id: $_id) {
      _id
      isActive
      fullName
      email
      phoneNumber
      avatar
      address
    }
  }
`;

export { currentUser, userDetail };
