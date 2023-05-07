import { Flex, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    display:"flex",
    flexDirection:"row",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
    boxShadow:'3px 3px 6px black'
  },

}));

export default useStyles;
