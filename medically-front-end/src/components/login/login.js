import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import GoogleButton from "react-google-button";
import { useState, useMemo } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { fetchUserprofile } from "../../utils/helpers/helper";
import { postRequest } from "../../utils/helpers/helper";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { isLogged, setisLogged } = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleLogin = () => {
    login();
  };

  const handleGoogleLogin = async () => {
    const userDetails = await fetchUserprofile(user.access_token);
    if (userDetails?.status == 200) {
      try {
        const userData = {
          email: userDetails?.data?.email,
          signinType: "googleSignin",
        };

        const response = await postRequest("user/login", userData);
        if (response?.status == 200) {
          setisLogged(true);
          notifications.show({
            id: "success-message",
            withCloseButton: true,
            autoClose: 3000,
            message: `Successfully Login 🎉🎉`,
            color: "green",
            loading: false,
          });
          navigate("/profile", { replace: true });
          console.log(response);

          const data = {
            Image: response?.data?.Image,
            email: response?.data?.email,
          };

          // Store all User Data in Localstorage
          localStorage.setItem("Token", JSON.stringify(response?.data?.Token));
          localStorage.setItem("userData", JSON.stringify(data));
          localStorage.setItem("Role", JSON.stringify(response?.data?.Role));
        }
      } catch (error) {
        console.log("my error", error);
        notifications.show({
          id: "error-message",
          withCloseButton: true,
          autoClose: 3000,
          message: `${error?.response?.data?.message}`,
          color: "red",
          loading: false,
        });
      }
    }
  };

  useMemo(async () => {
    handleGoogleLogin();
  }, [user]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      signinType: "Signin",
    },
    validate: (values) => ({
      email:
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g.test(
          values.email
        ) !== true
          ? "Invalid Email"
          : values.email == ""
          ? "Email is required"
          : null,
      password: values.password == "" ? "Password is required" : null,
    }),
  });

  // Handle form submit
  const handleSubmit = async (values) => {
    try {
      const response = await postRequest("user/login", values);
      if (response?.status == 200) {
        setisLogged(true);
        notifications.show({
          id: "success-message",
          withCloseButton: true,
          autoClose: 3000,
          message: `Successfully Login 🎉🎉`,
          color: "green",
          loading: false,
        });
        navigate("/profile", { replace: true });
        console.log(response);

        const data = {
          Image: response?.data?.Image,
          email: response?.data?.email,
        };

        // Store all User Data in Localstorage
        localStorage.setItem("Token", JSON.stringify(response?.data?.Token));
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("Role", JSON.stringify(response?.data?.Role));
      }
    } catch (error) {
      console.log(error);
      notifications.show({
        id: "error-message",
        withCloseButton: true,
        autoClose: 3000,
        message: `${error?.response?.data?.message}`,
        color: "red",
        loading: false,
      });
    }
  };

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
      <Container size={420} my={90}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          })}
        >
          Welcome back !
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/signup")}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <GoogleButton onClick={handleLogin} style={{ width: "100%" }} />
          <Divider
            size="sm"
            mt={20}
            mb={20}
            label="OR"
            labelPosition="center"
          />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email Id"
              placeholder="Email Id"
              type="text"
              mt="md"
              name="email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              name="password"
              withAsterisk
              {...form.getInputProps("password")}
            />

            {/* <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group> */}
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};
export default Login;
