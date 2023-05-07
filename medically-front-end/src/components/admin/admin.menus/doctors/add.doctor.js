import { Container } from "@mantine/core";
import DoctorForm from "../../../registration/form/doctorForm";
const AddDoctors = () => {
  return(
    <Container style={{border:"1px solid gray" }} p={30} mt={30} mb={30}>
        <DoctorForm />
    </Container>
  );
};

export default AddDoctors;
