import { useStyles } from "../registration/cards/style";
import { Paper, Text, Title, Button, Container } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SelectModal from "./selectmodal";

const UserRoleCard = () => {
  const { classes } = useStyles();
  const {opened, open, close , setUsertype } = useContext(UserContext);

  // Handle Doctor Modal
  const handleDoctorModal = () => {
    open();
    setUsertype("Doctor")
  }

  // Handle Patient Modal
  const handlePatientModal = () => {
    open();
    setUsertype("Patient");
  }


  return (
    <Container size={400} my={90}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        mb={20}
        sx={{
          backgroundImage: `url(https://plus.unsplash.com/premium_photo-1661767273476-1cef336b6285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=861&q=80)`,
        }}
        className={classes.card}
      >
        <div>
          <Title order={3} className={classes.title}>
            As Doctor
          </Title>
        </div>
        <Button variant="white" color="dark" onClick={handleDoctorModal}>
          Select
        </Button>
      </Paper>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{
          backgroundImage: `url(https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
        }}
        className={classes.card}
      >
        <div>
          <Title order={3} className={classes.title} >
            As Patient
          </Title>
        </div>
        <Button variant="white" color="dark" onClick={handlePatientModal}>
          Select
        </Button>
      </Paper>
      <SelectModal />
    </Container>
  );
};

export default UserRoleCard;
