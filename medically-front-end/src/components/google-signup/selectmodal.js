import { Modal, Button, Group } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DoctorForm from "./forms/doctor.form";
import PatientForm from "./forms/patient.form";

const SelectModal = () => {
  const { opened, close, isUsertype , userDetails } = useContext(UserContext);
  console.log(userDetails);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={isUsertype == "Doctor" ? "Some Required Fileds for Doctor*" : "Some Required Fileds for Patient*"}
      centered
    >
     {
      isUsertype == "Doctor" ? <DoctorForm /> : <PatientForm />
     }
    </Modal>
  );
};

export default SelectModal;