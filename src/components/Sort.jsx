import { Select } from "@chakra-ui/react";
// import { useState } from "react";

export const Sort = () => {
  //   const [sort_url, setSort_url] = useState("");

  //   const sortChange = (url) => {
  //     setSort_url(url);
  // onChange(sort_url);
  //   };

  return (
    <Select placeholder="Sort By">
      <option
        value="date-asc"
        // onClick={sortChange("?_sort=startDate&_order=asc")}
      >
        Start asc
      </option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};
