import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import DeleteNoteButton from "@/components/DeleteNoteButton";
import { DELETE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const mockMutation = {
  request: {
    query: DELETE_NOTE,
    variables: { id: "1" },
  },
  result: {
    data: {
      deleteNote: { success: true, errors: null },
    },
  },
};

describe("DeleteNoteButton", () => {
  it("deletes a note successfully", async () => {
    render(
      <MockedProvider mocks={[mockMutation]} addTypename={false}>
        <DeleteNoteButton noteId="1" />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    });
  });
});
