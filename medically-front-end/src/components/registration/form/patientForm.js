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
  Divider,
  Radio,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const PatientForm = () => {
  //  Patient form inital values
  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      phone_number: "",
      gender: "",
      Dob:"",
      email: "",
      password: "",
      confirm_password: "",
    },

    validate: (values) => ({
      firstname: values.firstname == "" ? "First name is required" : null,
      lastname: values.lastname == "" ? "Last name is required" : null,
      password: values.password == "" ? "Password is required" : null,
      phone_number:
        values.phone_number == ""
          ? "Phone number is required"
          : /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(
              values.phone_number
            ) !== true
          ? "Invalid Phone number"
          : null,
      gender: values.gender == "" ? "Gender is required" : null,
      email:
        /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g.test(
          values.email
        ) !== true
          ? "Invalid Email"
          : values.email == ""
          ? "Email is required"
          : null,
      confirm_password:
        values.confirm_password === ""
          ? "Confirm Password is required"
          : values.confirm_password !== values.password
          ? "Password and Confirm password don't match"
          : null,
    }),
  });

  // Handle Submit
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="First Name"
          placeholder="First Name"
          type="text"
          withAsterisk
          {...form.getInputProps("firstname")}
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          type="text"
          mt="md"
          withAsterisk
          {...form.getInputProps("lastname")}
        />
        <TextInput
          label="Phone number"
          placeholder="Phone number"
          type="text"
          mt="md"
          withAsterisk
          {...form.getInputProps("phone_number")}
        />
        <Radio.Group
          name="gender"
          label="Gender"
          withAsterisk
          mt="md"
          {...form.getInputProps("gender")}
        >
          <Group mt="xs">
            <Radio value="Male" label="Male" checked={true} />
            <Radio value="Female" label="Female" />
            <Radio value="Other" label="Other" />
          </Group>
        </Radio.Group>
        <TextInput
          label="Date of Birth"
          placeholder="Date of Birth"
          type="date"
          mt="md"
          withAsterisk
          {...form.getInputProps("Dob")}
        />
        <TextInput
          label="Email Id"
          placeholder="Email Id"
          type="text"
          mt="md"
          withAsterisk
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          mt="md"
          withAsterisk
          {...form.getInputProps("confirm_password")}
        />

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default PatientForm;
