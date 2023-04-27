import { Paper, Text, Title, Button} from '@mantine/core';
import { useStyles } from './style';

const Doctorcard = () => {
  const { classes } = useStyles();
    
  return(
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(https://plus.unsplash.com/premium_photo-1661767273476-1cef336b6285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=861&q=80)` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          As Doctor
        </Title>
      </div>
      <Button variant="white" color="dark">
        Sign Up
      </Button>
    </Paper>
  );
}

export default Doctorcard;