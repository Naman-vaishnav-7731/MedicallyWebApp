import {
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Container,
  Textarea,
} from "@mantine/core";
import useStyles from "./usercard.style";
import { getRequest } from "../../utils/helpers/helper";
import { IconMapPinFilled, IconUserCircle , IconMail } from "@tabler/icons-react";

export function UserCardImage({ image, avatar, stats }) {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <>
      <div
        key={stat.fname}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          gap: "20px",
          padding: "3px",
        }}
      >
        <IconUserCircle />
        <Text fz="md" fw={500}>
          {stat.fname}
        </Text>
        <Text fz="md" fw={500}>
          {stat.lname}
        </Text>
      </div>
      <div
        key={stat.address}
        style={{
          width: "100%",
          padding: "3px",
          display: "flex",
          gap: "20px",
        }}
      >
        <IconMail />
        <Text fz="md" fw={500}>
          {stat.address}
        </Text>
      </div>
    </>
  ));

  return (
    <Container mb={20} mt={20}>
      <Card withBorder padding="xl" radius="md" className={classes.card}>
        <Card.Section
          sx={{
            backgroundImage: `url(${image})`,
            height: 250,
            backgroundSize: "cover",
          }}
        />
        <div
          style={{
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <Avatar
            src={avatar}
            size={150}
            radius={80}
            mx="auto"
            mt={-30}
            className={classes.avatar}
          />
        </div>

        <div style={{ width: "60%" }}>
          {" "}
          <Group mt="md">{items}</Group>
          <form>
            {" "}
            <Textarea placeholder="Write Here Your Bio Description" mt={10} />
            <div style={{ gap: "10px", display: "flex" }}>
              <Button
                radius="md"
                mt="xl"
                size="sm"
                color={theme.colorScheme === "dark" ? undefined : "dark"}
                disabled={true}
              >
                Add Description
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}
