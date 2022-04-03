import { gql } from '@apollo/client';
const categories = gql`
  query categories {
    categories {
      _id
      name
      type
    }
  }
`;

const products = gql`
  query products(
    $categoryId: String
    $searchValue: String
    $page: Int
    $perPage: Int
    $userId: String
  ) {
    products(
      categoryId: $categoryId
      searchValue: $searchValue
      page: $page
      perPage: $perPage
      userId: $userId
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
        description
        parentId
        order
        childCount
      }
      createdAt
      createdBy
    }
  }
`;

const productDetail = gql`
  query productDetail($id: String) {
    productDetail(_id: $id) {
      _id
      name
      type
      description
      unitPrice
      categoryId
      category {
        _id
        name
        description
        parentId
        order
        childCount
      }
      createdAt
      createdBy
    }
  }
`;

export { products, productDetail };

export { categories };
