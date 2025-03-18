// __tests__/components/NotesList.test.js
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import NotesList from '@/components/NotesList';
import { FETCH_NOTES } from '@/graphql/queries';

const mocks = [
  {
    request: { query: FETCH_NOTES },
    result: {
      data: {
        notes: [
          {
            id: "1",
            title: "Test Note",
            body: "This is a test note.",
            sentimentScore: 1.0,
            sentimentLabel: "positive",
          },
        ],
      },
    },
  },
];

describe('NotesList Component', () => {
  test('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NotesList />
      </MockedProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders notes from GraphQL API', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NotesList />
      </MockedProvider>
    );
    
    // Wait for the note title to appear
    const noteTitle = await screen.findByText("Test Note");
    expect(noteTitle).toBeInTheDocument();
    // Also check for the body text
    expect(screen.getByText("This is a test note.")).toBeInTheDocument();
  });
});
