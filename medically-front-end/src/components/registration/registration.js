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
import { useState } from "react";
import { fetchUserprofile } from "../../utils/helpers/helper";
import { useMemo } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Registration = () => {
  const navigate = useNavigate();
  const { userDetails, setuserDetails } = useContext(UserContext);

  // Set user Information for signup with login
  const [user, setUser] = useState([]);

  const signup = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleSignup = () => {
    signup();
  };

  // implement useMemo for Encahnce the Perfomance
  useMemo(async () => {
    // setuserDetails(null);
    const userData = await fetchUserprofile(user.access_token);
    setuserDetails(userData);
    if(userData?.status == 200){
      navigate('/userrole' , {replace : true});
    }
  }, [user]);
  

  return (
    <>
      <Button
        variant="outline"
        radius="md"
        style={{ position: "absolute", left: "30px", top: "40px" }}
        onClick={() => navigate("/" , { replace: true })}
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
            onClick={() => navigate("/login" , { replace: true })}
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
