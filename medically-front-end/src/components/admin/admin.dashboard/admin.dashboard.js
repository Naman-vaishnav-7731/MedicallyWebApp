import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  rem,
  Button,
  Box,
  Paper,
  Text,
  Menu,
} from "@mantine/core";
import { LinksGroup } from "../../navlink/navlink";
import { mockdata } from "./admin.helper";
import useStyles from "./admin.dashboard.style";
import UserButton from "../../userbutton/userbutton";
import namanImg from "../../../assests/image/naman.jpg";
import { BsList } from "react-icons/bs";
import { useState } from "react";
import {
  IconUserCircle,
  IconPhoto,
  IconLogout,
  IconDashboard,
  
} from "@tabler/icons-react";

const AdminDashboard = () => {
  const { classes } = useStyles();
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const [isOpen, setisOpne] = useState(true);

  const handleSidenavbar = () => {
    setisOpne(!isOpen);
  };

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <>
      <Navbar
        height={600}
        style={{ width: "250px", position: "fixed", top: "0" }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <h3 width={rem(120)}>Medically❤️</h3>
            <Button variant="outline" onClick={handleSidenavbar}>
              <BsList size={20} />
            </Button>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
      <Paper p="md" style={{ width: "70%", margin: "auto" }} ma>
        <Text>Paper is the most basic ui component</Text>
        <Text>
          Use it to create cards, dropdowns, modals and other components that
          require background with shadow
        </Text>
      </Paper>
    </>
  );
};

export default AdminDashboard;
