import { Paper, Text, Title, Button} from '@mantine/core';
import { useStyles } from './style';

const Patientcard = () => {
    const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          As Patient
        </Title>
      </div>
      <Button variant="white" color="dark">
        Sign Up
      </Button>
    </Paper>
  );
};

export default Patientcard;
