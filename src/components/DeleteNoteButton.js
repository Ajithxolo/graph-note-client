"use client";
import { useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { DELETE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const DeleteNoteButton = ({ noteId }) => {
  const toast = useToast();
  
  const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
    onCompleted: () => {
      toast({
        title: "Note deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const handleDelete = async () => {
    await deleteNote({ variables: { id: noteId } });
  };

  return (
    <Button
      onClick={handleDelete}
      colorScheme="red"
      variant="outline"
      size="sm"
      leftIcon={<LuTrash2 />}
      isLoading={loading}
      loadingText="Deleting"
    >
      Delete
    </Button>
  );
};

export default DeleteNoteButton;
