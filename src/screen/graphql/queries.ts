import {gql} from '@apollo/client';

const currentUser = gql(`
query CurrentUser {
    currentUser {
      _id
      isActive
      fullName
      email
      phoneNumber
      avatar
      firstName
      lastName
      address
    }
  }
`);

export {currentUser};
