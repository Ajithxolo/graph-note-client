// EditNoteForm.js
"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { 
  Box,
  VStack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Heading,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { UPDATE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const EditNoteForm = ({ note, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const toast = useToast();

  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
    onCompleted: () => {
      toast({
        title: "Note updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNote({ variables: { id: note.id, title, body } });
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="2xl"
      p={6}
      maxW="md"
      w="full"
    >
      <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h2" fontSize="2xl" color="gray.800">
            Edit Note
          </Heading>
          <IconButton
            icon={<LuX />}
            aria-label="Close edit form"
            variant="ghost"
            onClick={onClose}
            colorScheme="gray"
          />
        </Flex>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            Error: {error.message}
          </Alert>
        )}

        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            focusBorderColor="blue.500"
            isRequired
          />
        </FormControl>

        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            focusBorderColor="blue.500"
            resize="vertical"
            isRequired
          />
        </FormControl>

        <Flex gap={3} justify="flex-end" mt={4}>
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            colorScheme="gray"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            loadingText="Updating..."
          >
            Save Changes
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default EditNoteForm;