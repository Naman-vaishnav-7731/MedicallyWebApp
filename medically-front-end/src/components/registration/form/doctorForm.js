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

const DoctorForm = () => {
  //Intial values
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
      qualification: "",
      specialization: "",
      city: "",
      zipcode: "",
      address: "",
    },

    //ToDO: Implementation of Validation of address

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
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          mt="md"
          name="confirm_password"
          withAsterisk
          {...form.getInputProps("confirm_password")}
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

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default DoctorForm;
