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
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useForm } from "@mantine/form";
import { postRequest } from "../../utils/helpers/helper";
import { notifications } from "@mantine/notifications";
import { nprogress, NavigationProgress } from "@mantine/nprogress";

const AdminLogin = () => {
  //TODO:Implementation of Remember me Functionility

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      admin_email: "",
      password: "",
    },

    validate: (values) => ({
      password: values.password == "" ? "Password is required" : null,
      admin_email:
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g.test(
          values.admin_email
        ) !== true
          ? "Invalid Email"
          : values.admin_email == ""
          ? "Email is required"
          : null,
    }),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await postRequest("admin/login", values);
      if (response) {
        nprogress.start();
        notifications.show({
          id: "success-message",
          withCloseButton: true,
          autoClose: 3000,
          message: `Sucessfully Login`,
          color: "green",
          loading: false,
        });
        nprogress.complete();

        const adminData = {
          email: response?.data?.email,
          name: response?.data?.name,
        };

        // Store JWT Token and admin Details in Localstorage
        localStorage.setItem("Token", JSON.stringify(response?.data?.Token));
        localStorage.setItem("adminData", JSON.stringify(adminData));

        // Navigate to Admin Dashboard
        navigate('/dashboard')
      }
    } catch (error) {
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
        onClick={() => navigate("/")}
      >
        <FiArrowLeft size={25} />
      </Button>
      <Container size={420} my={90}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 400,
          })}
        >
          Welcome back ! Admin🧑‍💻
        </Title>
        <NavigationProgress />
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email Id"
              placeholder="Email Id"
              type="text"
              mt="md"
              name="admin_email"
              withAsterisk
              {...form.getInputProps("admin_email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              name="password"
              withAsterisk
              {...form.getInputProps("password")}
            />
            <Group position="apart" mt="lg">
              {/* <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor> */}
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AdminLogin;
