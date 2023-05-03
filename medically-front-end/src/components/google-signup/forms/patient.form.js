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
  
  const PatientForm = () => {
    //  Patient form inital values
    const form = useForm({
      initialValues: {
        firstname: "",
        lastname: "",
        phone_number: "",
        gender: "",
        Dob: "",
        city: "",
        zipcode: "",
        address: "",
      },
  
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
  
  export default PatientForm;
  