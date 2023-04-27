import {
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  ActionIcon,
  Divider,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleButton from "react-google-button";
import Doctorcard from "./cards/doctorcard";
import Patientcard from "./cards/patientcard";

const Registration = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outline"
        radius="md"
        style={{ position: "absolute", left: "30px", top: "40px" }}
        onClick={() => navigate("/")}
      >
        <FiArrowLeft size={25} />
      </Button>
      <Container size={500} my={90}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 200,
          })}
        >
          Get started with Medically!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do you have an account yet?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/login")}
          >
            Sign In Here
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={20} radius="md">
          <GoogleButton
            label="Sign Up With Google"
            onClick={() => {
              console.log("Google button clicked");
            }}
            style={{ width: "100%" }}   
          />
          <Divider
            size="sm"
            mt={20}
            mb={20}
            label="OR"
            labelPosition="center"
          />
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "sm", sm: "lg" }}
            justify={{ sm: "center" }}
          >
            <Doctorcard />
            <Patientcard />
          </Flex>
        </Paper>
      </Container>
    </>
  );
};

export default Registration;
