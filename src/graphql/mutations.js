import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $body: String!) {
    createNote(input: { title: $title, body: $body }) {
      note {
        id
        title
        body
        sentimentScore
        sentimentLabel
      }
      errors
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String!, $body: String!) {
    updateNote(input: { id: $id, title: $title, body: $body }) {
      note {
        id
        title
        body
        sentimentScore
        sentimentLabel
      }
      errors
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(input: { id: $id }) {
      success
      errors
    }
  }
`;
