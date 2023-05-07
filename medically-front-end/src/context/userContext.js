import { createContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Handle modal
  const [opened, { open, close }] = useDisclosure(false);
  const [isUsertype, setUsertype] = useState("");
  const [adminLogged, setadminLogged] = useState(false);
  const [userDetails, setuserDetails] = useState(null);
  const [isLogged, setisLogged] = useState(null);
  const [loggedUserdata, setloggedUserdata] = useState(null);

  return (
    <UserContext.Provider
      value={{
        opened,
        open,
        close,
        isUsertype,
        setUsertype,
        adminLogged,
        setadminLogged,
        userDetails,
        setuserDetails,
        isLogged,
        setisLogged,
        loggedUserdata,
        setloggedUserdata,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
