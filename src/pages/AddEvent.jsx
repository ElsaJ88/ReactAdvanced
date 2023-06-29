import {
  Textarea,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
  Flex,
  CheckboxGroup,
} from "@chakra-ui/react";

import { EventContext } from "../Contexts";
import React, { useState, useContext } from "react";

export const AddEvent = () => {
  const toast = useToast();

  const { categories, users } = useContext(EventContext);

  const [createdBy, setCreatedBy] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [attendedBy, setAttendedBy] = useState([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    e.preventDefault();
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      toast({
        title: "Succesfully Submitted",
        description: "",
        status: "success",
        isClosable: false,
        duration: 3000,
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        status: "warning",
        isClosable: true,
      });
    }
    const json = await response.json();
    const newId = await json.id;

    if (response.status === 201) {
      setTimeout(() => window.location.replace(`/event/${newId}`), 3000);
    } else {
      setIsSubmitted(false);
    }
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
      <Heading
        bgGradient="linear(to-r, orange.200, pink.500)"
        p={3}
        align="center"
        fontFamily={"monospace"}
      >
        Add a new event
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex m={5} flexDir="column" gap={2} w="90vw">
          <FormControl isRequired>
            <FormLabel htmlFor="user" isRequired>
              User:
            </FormLabel>
            <Select
              placeholder="Choose an user"
              id="user"
              bg="gray.50"
              onChange={(e) => setCreatedBy(Number(e.target.value))}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="title">Name of the event: </FormLabel>
            <Input
              bg="gray.50"
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
              bg="gray.50"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="location">Location: </FormLabel>
            <Input
              bg="gray.50"
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
              bg="gray.50"
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
              w={250}
              bg="gray.50"
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
              w={250}
              bg="gray.50"
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
            {isSubmitted ? (
              <Button isLoading />
            ) : (
              <Button colorScheme="pink" type="submit">
                Submit
              </Button>
            )}
          </FormControl>
        </Flex>
      </form>
    </>
  );
};
