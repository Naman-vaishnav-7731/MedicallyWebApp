import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Avatar,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles, mockdata } from "./headerstyle";
import { useNavigate } from "react-router-dom";
import namanImg from "../../../assests/image/naman.jpg";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import {
  IconUserCircle,
  IconPhoto,
  IconLogout,
  IconDashboard,
  IconBrandMessenger,
  IconHome2,
  IconStethoscope,
} from "@tabler/icons-react";

export function Headbar() {
  const navigate = useNavigate();
  const { adminLogged, setadminLogged, isLogged, setisLogged } =
    useContext(UserContext);
  const loggedUser = JSON.parse(localStorage.getItem("userData"));

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const handleLogout = () => {
    localStorage.clear();
    setadminLogged(false);
    setisLogged(false);
    navigate("/", { replace: true });
  };

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group>Medically🧑‍⚕️</Group>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <a className={classes.link} onClick={() => navigate("/")}>
              <IconHome2 size={23} />
              Home
            </a>
            <a className={classes.link} onClick={() => navigate("ourdoctors")}>
              <IconStethoscope size={23} />
              Our Doctors
            </a>

            {adminLogged || isLogged ? (
              <a className={classes.link} onClick={() => navigate("chatroom")}>
                <IconBrandMessenger size={23} />
                Chat Room
              </a>
            ) : null}
          </Group>

          <Group className={classes.hiddenMobile}>
            {adminLogged || isLogged ? (
              <>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Avatar
                      component="a"
                      target="_blank"
                      src={`/usersImage/${loggedUser?.Image}`}
                      alt="it's me"
                    />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    {adminLogged ? (
                      <Menu.Item
                        icon={<IconDashboard size={14} />}
                        onClick={() => navigate("/dashboard")}
                      >
                        Admin Dashboard
                      </Menu.Item>
                    ) : isLogged ? (
                      <Menu.Item
                        icon={<IconDashboard size={14} />}
                        onClick={() => navigate("/profile")}
                      >
                        Profile
                      </Menu.Item>
                    ) : null}
                    <Menu.Item
                      icon={<IconLogout size={14} />}
                      onClick={handleLogout}
                    >
                      Log out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            ) : (
              <>
                <Button variant="default" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button onClick={() => navigate("/signup")}>Sign up</Button>
              </>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Medically❤️"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <Collapse in={linksOpened}>{links}</Collapse>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            {adminLogged ? null : (
              <>
                <Button
                  variant="default"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  Log in
                </Button>
                <Button onClick={() => navigate("/signup", { replace: true })}>
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
