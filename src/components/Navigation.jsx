import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex
      bg="gray.200"
      gap={10}
      justify="center"
      p={2}
      fontFamily={"monospace"}
      fontSize={"lg"}
    >
      <Box>
        <Link to="/">Home</Link>
      </Box>
      <Box>
        <Link to="/addevent">Add Event</Link>
      </Box>
    </Flex>
  );
};
