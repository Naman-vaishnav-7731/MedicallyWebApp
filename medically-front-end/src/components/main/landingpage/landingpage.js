import { Title, Text, Container, Button, Overlay, createStyles, rem } from '@mantine/core';
import useStyles from './landingstyle';
import { useNavigate } from 'react-router-dom';


const Landingpage = () => {
    const { classes, cx } = useStyles();
    const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1}/>

      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome To{' '}
          <Text component="span" inherit className={classes.highlight}>
            Medically
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
          Virtual Healthcare Made Easy  Access Medical Services and Communicate with Your Doctor on Our Website.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg" onClick={() => navigate('/signup' , { replace: true })}>
            Get started
          </Button>
          <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
            Request To Appointment
          </Button>
        </div>
      </div>
    </div>)
}

export default Landingpage;