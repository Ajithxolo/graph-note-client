import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import CreateNoteForm from "@/components/CreateNoteForm";
import { CREATE_NOTE } from "@/graphql/mutations";

const mockMutation = {
  request: {
    query: CREATE_NOTE,
    variables: { title: "Test Note", body: "This is a test note." },
  },
  result: {
    data: {
      createNote: {
        note: { id: "1", title: "Test Note", body: "This is a test note.", sentimentScore: 0.9, sentimentLabel: "Positive" },
        errors: null,
      },
    },
  },
};

describe("CreateNoteForm", () => {
  it("renders the form and submits a new note", async () => {
    render(
      <MockedProvider mocks={[mockMutation]} addTypename={false}>
        <CreateNoteForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Test Note" } });
    fireEvent.change(screen.getByPlaceholderText("Body"), { target: { value: "This is a test note." } });
    
    fireEvent.click(screen.getByText("Create Note"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Title")).toHaveValue("");
      expect(screen.getByPlaceholderText("Body")).toHaveValue("");
    });
  });
});
