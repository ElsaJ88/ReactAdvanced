import { Text, Box } from "@chakra-ui/react";

export const EventDate = ({ event }) => {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "juli",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return (
    <Box fontSize="xs">
      <Text>
        Start: {startTime.getHours()}:
        {startTime.getMinutes() === 0
          ? startTime.getMinutes() + "0"
          : startTime.getMinutes() <= 9
          ? "0" + startTime.getMinutes()
          : startTime.getMinutes()}
        {" - "}
        {startTime.getDate()} {months[startTime.getMonth()]}{" "}
        {startTime.getFullYear()}
      </Text>
      <Text>
        End: {endTime.getHours()}:
        {endTime.getMinutes() == 0
          ? endTime.getMinutes() + "0"
          : endTime.getMinutes() <= 9
          ? "0" + endTime.getMinutes()
          : endTime.getMinutes()}
        {" - "}
        {endTime.getDate()} {months[endTime.getMonth()]} {endTime.getFullYear()}
      </Text>
    </Box>
  );
};
