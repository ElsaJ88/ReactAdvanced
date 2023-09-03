import { Button, useToast } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useRef } from "react";

export const DeleteButton = (event) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const id = event.event.id;

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    }).then((res) => {
      onClose();
      res.status === 200
        ? toast({
            title: "Succesfully Deleted",
            description: "You will be redirected to the homepage.",
            status: "success",
            isClosable: false,
            duration: 3000,
          }) && setTimeout(() => location.replace("/"), 3000)
        : toast({
            title: "Something went wrong",
            description: "Please try again.",
            status: "warning",
            isClosable: true,
          });
    });
  };
  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this event?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                type="submit"
                onClick={handleDelete}
                ml={3}
              >
                Delete
              </Button>
              <AlertDialogCloseButton />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
