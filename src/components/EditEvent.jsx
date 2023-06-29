import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Checkbox,
  useToast,
  Button,
  Modal,
  ModalContent,
  Heading,
} from "@chakra-ui/react";
import { useState, useContext, useRef } from "react";
import { EventContext } from "../Contexts";

export const EditEvent = ({ event, setCurrEvent }) => {
  const toast = useToast();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef();

  const { categories, users } = useContext(EventContext);

  const [createdBy, setCreatedBy] = useState(event.createdBy);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [categoryIds, setCategoryIds] = useState(event.categoryIds);
  const [attendedBy, setAttendedBy] = useState(event.attendedBy);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);

  const handleSubmit = async () => {
    onCloseAlert();

    const formData = {
      createdBy: createdBy,
      title: title,
      description: description,
      image: image,
      categoryIds: categoryIds,
      attendedBy: attendedBy,
      location: location,
      startTime: startTime,
      endTime: endTime,
    };
    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      if (res.status === 200) {
        onCloseModal();
        const changedEvent = await res.json();
        setCurrEvent(changedEvent);
        toast({
          title: "Succesfully Changed",
          description: "",
          status: "success",
          duration: 4000,
          isClosable: false,
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  const handleCategoryChange = (e) => {
    setCategoryIds((current) => current.filter((id) => id != e.target.value));
    const addCategory = () => {
      if (e.target.checked) {
        setCategoryIds([...categoryIds, Number(e.target.value)]);
      } else if (!e.target.checked) {
        setCategoryIds((current) =>
          current.filter((id) => id != e.target.value)
        );
      } else return;
    };
    addCategory();
  };

  return (
    <>
      <Button onClick={onOpenModal}>Edit Event</Button>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalContent p={7}>
          <Heading>Edit Event </Heading>
          <form id="new-event-form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="user">User:</FormLabel>
              <Select onChange={(e) => setCreatedBy(Number(e.target.value))}>
                {users.map((user) => {
                  return (
                    <option
                      key={user.id}
                      value={user.id}
                      selected={user.id === createdBy ? true : undefined}
                    >
                      {user.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="title">Name of the event: </FormLabel>
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Description: </FormLabel>
              <Textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="location">Location: </FormLabel>
              <Input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="image">Image Url:</FormLabel>
              <Input
                type="url"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="startTime">Start Time: </FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="endTime">End Time: </FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                id="endTime"
                value={endTime}
                min={startTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="categoryIds">Categories: </FormLabel>
              {categories.map((cat) => (
                <Checkbox
                  key={cat.id}
                  id={cat.name}
                  name="category"
                  value={cat.id}
                  onChange={(e) => handleCategoryChange(e)}
                  textTransform="capitalize"
                  isChecked={categoryIds.includes(cat.id)}
                >
                  {cat.name}
                </Checkbox>
              ))}
            </FormControl>

            <FormControl>
              <Button onClick={onOpenAlert}>Submit</Button>
              <AlertDialog
                isOpen={isOpenAlert}
                leastDestructiveRef={cancelRef}
                onClose={onCloseAlert}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Submit Event
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to edit this event?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseAlert}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        type="submit"
                        onClick={handleSubmit}
                        ml={3}
                      >
                        Submit
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
