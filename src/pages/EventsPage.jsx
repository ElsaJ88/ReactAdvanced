import React, { useContext, useState } from "react";

import { EventContext } from "../Contexts";

import { Link, useLoaderData } from "react-router-dom";

import {
  Input,
  Flex,
  Image,
  Text,
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";

import { CategoryChange } from "../components/CategoryChange";
import { EventDate } from "../components/EventDate";
import { Categories } from "../components/Categories";

export const loader = async () => {
  const events = await fetch(
    `https://my-json-server.typicode.com/ElsaJ88/ReactAdvanced/events/`
  );
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const { categories, users } = useContext(EventContext);
  const [searchFieldInput, setSearchFieldInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(0);

  const filteredList = events.filter((event) => {
    if (categoryFilter === 0) {
      return event;
    } else {
      return event.categoryIds.includes(categoryFilter);
    }
  });

  const eventList = filteredList.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchFieldInput.toLowerCase()) ||
      event.description.toLowerCase().includes(searchFieldInput.toLowerCase())
    );
  });

  const handleChange = (input) => {
    setSearchFieldInput(input.target.value);
  };

  const handleCategoryChange = (input) => {
    setSearchFieldInput("");
    setCategoryFilter(input);
  };

  return (
    <EventContext.Provider
      value={{ categories, users, eventList, categoryFilter }}
    >
      <Flex
        bgGradient="linear(to-r, orange.200, pink.500)"
        justify={"space-evenly"}
        align="center"
        p={3}
        flexDir={{ base: "column", md: "row" }}
      >
        {" "}
        <Input
          type="text"
          w="40vw"
          onChange={handleChange}
          value={searchFieldInput}
          placeholder="Search events..."
          bg="gray.50"
        />
        <CategoryChange onChange={handleCategoryChange} />
      </Flex>
      <Flex
        mt={10}
        justify="space-evenly"
        flexWrap="wrap"
        flexDir={["column", "row"]}
        gap={[3]}
      >
        {eventList.map((event) => {
          return (
            <Box
              key={event.id}
              _hover={{ transform: "scale(1.01)" }}
              boxShadow="md"
              p={5}
              align="center"
              mb={4}
              w={["100vw", "80vw", "40vw", "22vw"]}
              rounded="lg"
              bg="gray.50"
            >
              <Link to={`/event/${event.id}`}>
                <Heading
                  fontFamily={"monospace"}
                  size="md"
                  justify={"space-evenly"}
                  align="center"
                  p={2}
                >
                  {event.title}
                </Heading>
                <Image
                  src={event.image}
                  w={{ base: "95vw", sm: "95vw" }}
                  h={{ base: 300, sm: 200 }}
                  objectFit="cover"
                  alt={event.title}
                />
                <Text m={2}>{event.description}</Text>

                <EventDate event={event} />
                <Center p={2}>
                  <Categories event={event} />
                </Center>
              </Link>
            </Box>
          );
        })}
      </Flex>
    </EventContext.Provider>
  );
};
