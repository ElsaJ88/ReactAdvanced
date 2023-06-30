import { SimpleGrid, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EventContext } from "../Contexts";

export const CategoryChange = ({ onChange }) => {
  const { categories, categoryFilter } = useContext(EventContext);

  return (
    <RadioGroup defaultValue={0} value={categoryFilter}>
      <SimpleGrid columns={{ base: 3, md: 6 }} m={2}>
        <Radio value={0} onChange={() => onChange(0)} bg={"gray.50"} px={1}>
          All
        </Radio>
        {categories.map((cat) => (
          <Radio
            key={cat.id}
            value={cat.id}
            onClick={() => onChange(cat.id)}
            bg={"gray.50"}
            px={1}
          >
            <Text textTransform="capitalize">{cat.name}</Text>
          </Radio>
        ))}
      </SimpleGrid>
    </RadioGroup>
  );
};
