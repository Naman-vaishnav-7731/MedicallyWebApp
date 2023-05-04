import { Container, ScrollArea, BackgroundImage, Input } from "@mantine/core";
import { Flex, Button } from "@mantine/core";
import {
  IconBrandMessenger,
  IconAlignLeft,
  IconSearch,
  IconMoodEmpty,
  IconSend,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Chat = () => {
  const [isOpen, setisOpen] = useState(true);
  const [ws, setws] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");
    setws(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  const handleMessage = (e) => {
    console.log(e);
  };

  // Handle sidenav
  const handleSidenav = () => {
    setisOpen(!isOpen);
  };

  return (
    <Container size="xlg" px="lg" mt={20} mb={20}>
      <Flex
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
        bg="blue"
        px={20}
        sx={{
          border: "1px solid white",
          boxSizing: "border-box",
        }}
      >
        <Button variant="subtle">
          <IconBrandMessenger color="white" />
          <h3 style={{ color: "white" }}>MediChat</h3>
        </Button>
        <Button variant="subtle" onClick={handleSidenav}>
          <IconAlignLeft color="white" />
        </Button>
      </Flex>
      <Flex
        mih={50}
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Container
          sx={{
            height: "70vh",
            width: "30%",
            display: isOpen ? "flex" : "none",
            border: "2px solid white",
            boxSizing: "border-box",
            border: "2px solid #cacfd3",
            borderTop: "none",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <div style={{ height: "10vh" }}>
            <Input
              icon={<IconSearch />}
              placeholder="Search User"
              sx={{
                borderRadius: "15px",
              }}
            />
          </div>
          <div style={{ height: "90vh" }}>All users</div>
        </Container>
        <Container
          sx={{
            height: "70vh",
            background: "white",
            width: isOpen ? "70%" : "100%",
            border: "2px solid #cacfd3",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            borderTop: "none",
            padding: "9px",
          }}
        >
          <div style={{ height: "90vh" }}>Here Frame</div>
          <div style={{ height: "10vh", display: "flex", gap: "10px" }}>
            {" "}
            <div style={{ width: "90%" }}>
              {" "}
              <Input
                icon={<IconMoodEmpty />}
                placeholder="Type Your Message Here"
              />
            </div>
            <Button variant="outline" sx={{ borderRadius: "50px" }}>
              <IconSend />
            </Button>
          </div>
        </Container>{" "}
      </Flex>
    </Container>
  );
};

export default Chat;
