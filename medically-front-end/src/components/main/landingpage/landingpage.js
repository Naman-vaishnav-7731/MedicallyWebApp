import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
  rem,
} from "@mantine/core";
import useStyles from "./landingstyle";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

const Landingpage = () => {
  const { classes, cx } = useStyles();
  const { isLogged, adminLogged } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome To{" "}
          <Text component="span" inherit className={classes.highlight}>
            Medically
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Virtual Healthcare Made Easy Access Medical Services and Communicate
            with Your Doctor on Our Website.
          </Text>
        </Container>

        <div className={classes.controls}>
          {isLogged || adminLogged ? (
            <Button
              className={classes.control}
              variant="white"
              size="lg"
              onClick={() => navigate("/ourdoctors", { replace: true })}
            >
              Explore More
            </Button>
          ) : (
            <Button
              className={classes.control}
              variant="white"
              size="lg"
              onClick={() => navigate("/signup", { replace: true })}
            >
              Get Started
            </Button>
          )}
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
          >
            Request To Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
