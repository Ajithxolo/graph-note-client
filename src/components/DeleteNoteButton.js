"use client";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const DeleteNoteButton = ({ noteId }) => {
  const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
  });

  const handleDelete = async () => {
    await deleteNote({ variables: { id: noteId } });
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="btn btn-danger">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteNoteButton;
