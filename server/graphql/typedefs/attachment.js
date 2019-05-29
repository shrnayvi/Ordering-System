const { gql } = require('apollo-server-express');

module.exports = gql`
    type Attachment {
        originalname: String
        filename: String
        mimetype: String
        status: Int
        size: Int
    }

    extend type Query {
        attachment(_id: ID!): Attachment
    }
`;