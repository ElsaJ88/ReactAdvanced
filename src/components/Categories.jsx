import { useContext } from "react";
import { Box, Tag } from "@chakra-ui/react";
import { EventContext } from "../Contexts";

export const Categories = ({ event }) => {
  const { categories } = useContext(EventContext);
  return (
    <Box>
      {event.categoryIds.map((id) => {
        const categoryName = categories.find((category) => id === category.id);
        return (
          <Tag textTransform="capitalize" key={id} bg="gray.300" m={1}>
            {categoryName.name}
          </Tag>
        );
      })}
    </Box>
  );
};
