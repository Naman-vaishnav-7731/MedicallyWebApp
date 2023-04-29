import { Modal, Button, Group } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import DoctorForm from "../../form/doctorForm";
import PatientForm from "../../form/patientForm";

const FormModal = () => {
  const { opened, close, isUsertype } = useContext(UserContext);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Get started with Medically!🧑‍⚕️"
      centered
    >
      {isUsertype == "Doctor" ? <DoctorForm /> : <PatientForm />}
    </Modal>
  );
};

export default FormModal;
