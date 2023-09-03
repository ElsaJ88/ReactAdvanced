import React, { useContext, useState } from "react";

import { EventContext } from "../Contexts";

import { useLoaderData } from "react-router-dom";

import {
  Image,
  Text,
  Heading,
  Grid,
  GridItem,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";

import { EditEvent } from "../components/EditEvent";
import { DeleteButton } from "../components/DeleteButton";
import { EventDate } from "../components/EventDate";
import { Categories } from "../components/Categories";

export const loader = async ({ params }) => {
  const event = await fetch(
    `https://my-json-server.typicode.com/ElsaJ88/ReactAdvanced/events/${params.eventId}`
  );
  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();
  const { users } = useContext(EventContext);
  const [currentEvent, setCurrentEvent] = useState(event);

  const textStyling = {
    color: "gray.600",
    fontStyle: "italic",
    fontWeight: "bold",
    p: 0.5,
  };

  const user = users.find((x) => x.id === currentEvent.createdBy);

  return (
    <Box>
      <Heading
        fontFamily={"monospace"}
        color={"gray.700"}
        size="xl"
        bgGradient="linear(to-r, orange.200, pink.500)"
        align="center"
        p={3}
      >
        {currentEvent.title}
      </Heading>
      <Center pt={4}>
        <Text>
          Currently for display purpose only, no adding and editing is allowed
          at this moment.
        </Text>
      </Center>
      <Grid
        justifyContent={"start"}
        templateColumns={"repeat(5, auto)"}
        templateRows={"repeat(7, auto)"}
      >
        <GridItem colSpan={{ base: "5", md: "3" }} rowSpan="7">
          <Image
            m={5}
            src={currentEvent.image}
            fallbackSrc="https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-edff8c3fe6afcab5c6457e3c7bd011f5c1745161.jpg"
            w={{ base: "90vw", md: "25em", lg: "35rem" }}
            h={{ base: "90vh", md: "25em", lg: "35rem" }}
            objectFit="cover"
            borderRadius={10}
            alt={currentEvent.title}
          />
        </GridItem>

        <GridItem colSpan={{ base: "5", md: "2" }} m={5} mt={7}>
          <Text sx={textStyling}>Description:</Text>
          <Text> {currentEvent.description}</Text>
        </GridItem>

        <GridItem colSpan={{ base: "5", md: "2" }} m={5}>
          <Text sx={textStyling}>Location:</Text>
          <Text>{currentEvent.location}</Text>
        </GridItem>

        <GridItem colSpan={{ base: "5", md: "2" }} m={5}>
          <Text sx={textStyling}>Date and time:</Text>
          <EventDate event={currentEvent} />
        </GridItem>

        <GridItem colSpan={{ base: "5", md: "2" }} m={5}>
          <Text sx={textStyling}>Categories:</Text>

          <Categories event={currentEvent} />
        </GridItem>

        <GridItem colSpan={{ base: "5", md: "2" }} m={5}>
          <Text sx={textStyling}>Created by:</Text>
          <Flex align={"center"}>
            <Image
              boxSize={50}
              objectFit="cover"
              borderRadius={40}
              src={user.image}
              alt={user.name}
              m={2}
            />
            <Text p={0.5}>{user.name}</Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: "5", md: "2" }} m={5}>
          <EditEvent event={currentEvent} setCurrEvent={setCurrentEvent} />
          <DeleteButton event={currentEvent} />
        </GridItem>
      </Grid>
    </Box>
  );
};
