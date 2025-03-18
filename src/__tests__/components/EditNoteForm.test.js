import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import EditNoteForm from "@/components/EditNoteForm";
import { UPDATE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const fetchNotesMock = {
  request: {
    query: FETCH_NOTES,
    variables: {},
  },
  result: {
    data: {
      notes: [
        {
          id: "1",
          title: "Updated Title",
          body: "Updated body.",
          sentimentScore: 0.8,
          sentimentLabel: "Neutral",
        },
      ],
    },
  },
};

const mockNote = { id: "1", title: "Old Title", body: "Old body" };

const mockMutation = {
  request: {
    query: UPDATE_NOTE,
    variables: { id: "1", title: "Updated Title", body: "Updated body" },
  },
  result: {
    data: {
      updateNote: {
        note: { id: "1", title: "Updated Title", body: "Updated body", sentimentScore: 0.8, sentimentLabel: "Neutral" },
        errors: null,
      },
    },
  },
};

describe("EditNoteForm", () => {
  it("renders the form and updates a note", async () => {
    const mockOnClose = jest.fn();

    render(
      <MockedProvider mocks={[fetchNotesMock, mockMutation]} addTypename={false}>
        <EditNoteForm note={mockNote} onClose={mockOnClose} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByDisplayValue("Old Title"), { target: { value: "Updated Title" } });
    fireEvent.change(screen.getByDisplayValue("Old body"), { target: { value: "Updated body" } });

    fireEvent.click(screen.getByText("Update Note"));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
