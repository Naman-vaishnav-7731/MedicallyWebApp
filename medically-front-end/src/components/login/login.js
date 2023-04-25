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
    ActionIcon
  } from '@mantine/core';
  import { useNavigate } from 'react-router-dom';
  import { FiArrowLeft } from "react-icons/fi";


const Login = () => {

    const navigate = useNavigate();

    return(
        <>
        <Button variant="outline" radius="md" style={{position:'absolute', left:'30px' , top:'40px'}} onClick={() => navigate('/')}>
           <FiArrowLeft size={25} />
        </Button>
        <Container size={420} my={90}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}
        >
          Welcome back !
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button" onClick={() => navigate('/signup')}>
            Create account
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container></>
    )
}
export default Login;