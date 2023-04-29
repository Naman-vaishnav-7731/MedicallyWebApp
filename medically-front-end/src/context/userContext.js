import { createContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Handle modal
  const [opened, { open, close }] = useDisclosure(false);
  const [isUsertype , setUsertype] = useState("");

  return (
    <UserContext.Provider value={{ opened, open, close , isUsertype , setUsertype }}>
      {children}
    </UserContext.Provider>
  );
};
