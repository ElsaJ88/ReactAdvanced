import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Header } from "../components/Header";
import { Box } from "@chakra-ui/react";
import { EventContext } from "../Contexts";

export const loader = async () => {
  const categories = await fetch(
    "https://my-json-server.typicode.com/ElsaJ88/ReactAdvanced/categories"
  );
  const users = await fetch(
    "https://my-json-server.typicode.com/ElsaJ88/ReactAdvanced/users"
  );
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const Root = () => {
  const { categories, users } = useLoaderData();

  return (
    <Box>
      <EventContext.Provider value={{ categories, users }}>
        <Header />
        <Navigation />
        <Outlet />
      </EventContext.Provider>
    </Box>
  );
};
