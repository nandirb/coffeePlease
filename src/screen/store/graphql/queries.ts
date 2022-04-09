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
  query Products {
    products {
      _id
      name
      type
      createdAt
      cal
      description
      unitPrice
      categoryId
      image
      productStatus
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
