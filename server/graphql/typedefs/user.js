const { gql } = require('apollo-server-express');

module.exports = gql`
   type User {
      _id: ID 
      method: String!
      role: String! 
      email: String!
      username: String!
      name: String
      phone: String 
      status: Int 
      avatar: Attachment
   }

   extend type Query {
      users: [User!]!
      user(_id: ID): User
   }

   extend type Mutation {
      register(method: String, role: String, role: String, email: String!, password: String!, username: String, name: String, phone: String, status: Int): User
      update(_id: ID!, avatar: ID, method: String, role: String, role: String, email: String, password: String, username: String, name: String, phone: String, status: Int): User
   }
`;