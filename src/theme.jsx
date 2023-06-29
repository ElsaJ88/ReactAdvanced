import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: "monospace",
        fontSize: "1rem",
        color: "gray.900",
        bg: "gray.100",
      },
    },
  },
});
