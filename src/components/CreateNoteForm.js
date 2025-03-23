// CreateNoteForm.js
"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Button, 
  Alert,
  AlertIcon,
  Heading,
  useToast
} from "@chakra-ui/react";
import { CREATE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const CreateNoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();

  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
    onCompleted: () => {
      toast({
        title: "Note created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTitle("");
      setBody("");
    },
    onError: (error) => {
      toast({
        title: "Error creating note",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({ variables: { title, body } });
  };

  return (
    <Box 
      bg="white" 
      boxShadow="lg" 
      borderRadius="lg" 
      p={6} 
      mb={8}
    >
      <form onSubmit={handleSubmit}>
        <Heading as="h2" fontSize="2xl" mb={4} color="gray.800">
          Create New Note
        </Heading>
        
        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            Error: {error.message}
          </Alert>
        )}

        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            required
            focusBorderColor="blue.500"
            colorScheme="blue"
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Content</FormLabel>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Note content"
            required
            rows={4}
            focusBorderColor="blue.500"
            resize="vertical"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="green"
          width="full"
          isLoading={loading}
          loadingText="Creating..."
          disabled={loading}
        >
          Create Note
        </Button>
      </form>
    </Box>
  );
};

export default CreateNoteForm;