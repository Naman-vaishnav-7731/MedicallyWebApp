import { Paper, Text, Title, Button } from "@mantine/core";
import { useStyles } from "./style";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import FormModal from "./modal/formModal";

const Patientcard = () => {
  const { classes } = useStyles();
  const { opened, open, close, setUsertype } = useContext(UserContext);

  // handle Patient modal
  const handleModal = () => {
    open();
    setUsertype("Patient");
  };
  return (
    <>
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
          <Title order={3} className={classes.title}>
            As Patient
          </Title>
        </div>
        <Button variant="white" color="dark" onClick={handleModal}>
          Sign Up
        </Button>
      </Paper>
      <FormModal />
    </>
  );
};

export default Patientcard;
