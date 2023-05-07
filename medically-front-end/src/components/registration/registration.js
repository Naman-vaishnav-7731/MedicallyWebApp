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
import GoogleButton from "react-google-button";
import Doctorcard from "./cards/doctorcard";
import Patientcard from "./cards/patientcard";
import { useState } from "react";
import { fetchUserprofile } from "../../utils/helpers/helper";
import { useMemo } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { getRequest } from "../../utils/helpers/helper";
import { notifications } from "@mantine/notifications";

const Registration = () => {
  const navigate = useNavigate();
  const { userDetails, setuserDetails } = useContext(UserContext);

  const [user, setUser] = useState([]);

  const signup = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleSignup = async () => {
    setUser([]);
    signup();
  };

  const handleUser = async () => {
    try {
      const userData = await fetchUserprofile(user.access_token);
      if (userData?.status == 200) {
        setuserDetails(userData);
        const response = await getRequest("user/" + userData?.data?.email);
        console.log(response);
        if (!(response?.status == 200)) {
          navigate("/", { replace: true });
        } else {
          notifications.show({
            id: "error-message",
            withCloseButton: true,
            autoClose: 3000,
            message: `${response?.data?.email} is already Exits`,
            color: "red",
            loading: false,
          });
        }
      }
    } catch (error) {
      if (error) {
        navigate("/userrole" , { replace: true });
      }
    }
  };

  // implement useMemo for Encahnce the Perfomance
  useMemo(async () => {
    handleUser();
  }, [user]);

  return (
    <>
      <Button
        variant="outline"
        radius="md"
        style={{ position: "absolute", left: "30px", top: "40px" }}
        onClick={() => navigate("/", { replace: true })}
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
            onClick={() => navigate("/login", { replace: true })}
          >
            Sign In Here
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={20} radius="md">
          <GoogleButton
            label="Sign Up With Google"
            onClick={handleSignup}
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
