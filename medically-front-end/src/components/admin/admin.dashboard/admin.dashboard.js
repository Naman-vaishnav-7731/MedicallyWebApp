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
  Container,
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
  IconHeartbeat,
} from "@tabler/icons-react";
import { Outlet } from "react-router-dom";

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
        style={{
          width: isOpen ? "250px" : "60px",
          position: "fixed",
          top: "0",
        }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Button
              variant="outline"
              onClick={handleSidenavbar}
              size={!isOpen ? "xsm" : "sm"}
              p={5}
            >
              {isOpen ? " Medically❤️" : <IconHeartbeat />}
            </Button>
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
      <Container size={700} mt={50}>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminDashboard;
