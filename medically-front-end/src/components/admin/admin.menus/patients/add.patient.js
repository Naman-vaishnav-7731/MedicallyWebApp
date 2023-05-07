import PatientForm from "../../../registration/form/patientForm";
import { Container } from "@mantine/core";


const AddPatient = () => {
  return (
    <Container style={{ border: "1px solid gray" }} p={30} mt={30} mb={30}>
      <PatientForm />
    </Container>
  );
};

export default AddPatient;
