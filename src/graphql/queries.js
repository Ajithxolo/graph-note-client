// graphql/queries.js
import { gql } from '@apollo/client';

export const FETCH_NOTES = gql`
  query fetchNotes {
    notes {
      id
      title
      body
      sentimentScore
      sentimentLabel
    }
  }
`;
