"use client";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { 
  VStack,
  Box,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/react";
import { FETCH_NOTES } from "@/graphql/queries";
import DeleteNoteButton from "@/components/DeleteNoteButton";
import { useNotes } from "@/context/NotesContext";

export default function NotesList({ onEdit }) {
  const { data, loading, error } = useQuery(FETCH_NOTES);
  const { setNoteCount } = useNotes();
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (data && data.fetchNotes) {
      setNoteCount(data.fetchNotes.length);
    }
  }, [data, setNoteCount]);

  if (loading) return (
    <VStack spacing={4} align="stretch">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} height="120px" borderRadius="lg" />
      ))}
    </VStack>
  );

  if (error) return (
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      Error: {error.message}
    </Alert>
  );

  if (!data || !data.fetchNotes) return (
    <Text color="gray.500" textAlign="center" py={4}>
      No notes found.
    </Text>
  );

  return (
    <VStack as="ul" spacing={4} align="stretch">
      {data.fetchNotes.map((note) => (
        <Box 
          as="li"
          key={note.id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="sm"
          bg={bgColor}
          borderColor={borderColor}
        >
          <Box mb={3}>
            <Heading as="h3" fontSize="lg" fontWeight="semibold" mb={2}>
              {note.title}
            </Heading>
            <Text color="gray.600" mb={3}>
              {note.body}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Sentiment: {note.sentimentLabel} ({note.sentimentScore})
            </Text>
          </Box>
          
          <Box display="flex" gap={2} mt={3}>
            <Button
              onClick={() => onEdit(note)}
              colorScheme="blue"
              size="sm"
              variant="outline"
            >
              Edit
            </Button>
            <DeleteNoteButton noteId={note.id} />
          </Box>
        </Box>
      ))}
    </VStack>
  );
}