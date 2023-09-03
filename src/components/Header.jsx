import { Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <>
      <Heading
        align="center"
        as="header"
        size="4xl"
        p={6}
        color="gray.600"
        fontFamily="monospace"
        bg="gray.50"
      >
        Events
      </Heading>
    </>
  );
};
