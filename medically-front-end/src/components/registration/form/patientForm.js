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
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientForm = () => {
  const navigate = useNavigate();
  //  Patient form inital values
  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      phone_number: "",
      gender: "",
      Dob: "",
      email: "",
      password: "",
      confirm_password: "",
      city: "",
      zipcode: "",
      address: "",
      userType: "Patient",
      Image: null,
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
      city: values.city == "" ? "city is required" : null,
      zipcode:
        values.zipcode == ""
          ? "Zipcode number is required"
          : /[1-4]/g.test(values.zipcode) !== true
          ? "Invalid Zipcode"
          : values.zipcode.length < 6
          ? "Zipcode must be 6 Digit only"
          : null,
    }),
  });

  // Handle Submit
  const handleSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("phone_number", values.phone_number);
    formData.append("gender", values.gender);
    formData.append("Dob", values.Dob);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("city", values.city);
    formData.append("zipcode", values.zipcode);
    formData.append("address", values.address);
    formData.append("Image", values.Image);
    formData.append("userType", values.userType);

    try {
      const response = await axios.post(
        "http://localhost:3002/user/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      form.reset();
    } catch (error) {
      console.log(error);
    }
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
        <Divider style={{ marginTop: "20px" }} size={1} />
        <TextInput
          label="City"
          placeholder="City"
          type="text"
          mt="md"
          name="city"
          withAsterisk
          {...form.getInputProps("city")}
        />
        <TextInput
          label="Zipcode"
          placeholder="Zip code"
          type="text"
          mt="md"
          withAsterisk
          name="zipcode"
          maxLength={6}
          {...form.getInputProps("zipcode")}
        />
        <Textarea
          label="Address"
          placeholder="Address"
          type="textarea"
          name="address"
          mt="md"
          withAsterisk
          onChange={(e) => {
            form.getInputProps("address").onChange(e);
          }}
        />

        <TextInput
          label="Profile Picture"
          placeholder="Profile Picture"
          type="file"
          mt="md"
          name="Image"
          withAsterisk
          onChange={(e) => {
            form.getInputProps("Image").onChange(e?.currentTarget?.files[0]);
          }}
          accept="image/png,image/jpeg"
        />

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default PatientForm;
