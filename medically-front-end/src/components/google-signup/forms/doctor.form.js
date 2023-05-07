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
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const DoctorForm = () => {
  const navigate = useNavigate();
  const { userDetails, setuserDetails } = useContext(UserContext);
  //Intial values
  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      phone_number: "",
      gender: "",
      Dob: "",
      email: userDetails?.data?.email,
      qualification: "",
      specialization: "",
      city: "",
      zipcode: "",
      address: "",
      userType: "Doctor",
      Image: null,
      signupType: "googleSignup",
    },

    //ToDO: Implementation of Validation of address

    validate: (values) => ({
      firstname: values.firstname == "" ? "First name is required" : null,
      lastname: values.lastname == "" ? "Last name is required" : null,
      phone_number:
        values.phone_number == ""
          ? "Phone number is required"
          : /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(
              values.phone_number
            ) !== true
          ? "Invalid Phone number"
          : null,
      gender: values.gender == "" ? "Gender is required" : null,
      specialization:
        values.specialization == "" ? "specialization is required" : null,
      qualification:
        values.qualification == "" ? "qualification  is required" : null,
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

  const handleSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("phone_number", values.phone_number);
    formData.append("gender", values.gender);
    formData.append("Dob", values.Dob);
    formData.append("email", values.email);
    formData.append("signupType", values.signupType);
    formData.append("qualification", values.qualification);
    formData.append("specialization", values.specialization);
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
      if (response) {
        notifications.show({
          id: "success-message",
          withCloseButton: true,
          autoClose: 3000,
          message: `Sucessfully Login`,
          color: "green",
          loading: false,
        });
        form.reset();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      notifications.show({
        id: "error-message",
        withCloseButton: true,
        autoClose: 3000,
        message: `${error.response.data.message}`,
        color: "red",
        loading: false,
      });
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="First Name"
          placeholder="First Name"
          type="text"
          name="firstname"
          withAsterisk
          {...form.getInputProps("firstname")}
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          type="text"
          mt="md"
          name="lastname"
          withAsterisk
          {...form.getInputProps("lastname")}
        />
        <TextInput
          label="Phone number"
          placeholder="Phone number"
          type="text"
          mt="md"
          name="phone_number"
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
            <Radio value="Male" name="gender" label="Male" checked={true} />
            <Radio value="Female" name="gender" label="Female" />
            <Radio value="Other" name="gender" label="Other" />
          </Group>
        </Radio.Group>
        <TextInput
          label="Date of Birth"
          placeholder="Date of Birth"
          type="date"
          mt="md"
          name="Dob"
          withAsterisk
          {...form.getInputProps("Dob")}
        />
        <Divider style={{ marginTop: "20px" }} size={1} />
        <TextInput
          label="Qualification"
          placeholder="Qualification"
          type="text"
          mt="md"
          name="qualification"
          withAsterisk
          {...form.getInputProps("qualification")}
        />
        <TextInput
          label="Specialization"
          placeholder="specialization"
          type="text"
          mt="md"
          name="specialization"
          withAsterisk
          {...form.getInputProps("specialization")}
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

export default DoctorForm;
