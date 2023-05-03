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
    ActionIcon,
    Divider
  } from '@mantine/core';
  import { useNavigate } from 'react-router-dom';
  import { FiArrowLeft } from "react-icons/fi";
  import GoogleButton from 'react-google-button';
  import { useState , useMemo } from 'react';
  import { useGoogleLogin } from '@react-oauth/google';
  import { nprogress, NavigationProgress } from '@mantine/nprogress';
  import { fetchUserprofile } from '../../utils/helpers/helper';


const Login = () => {
  
  // Set user Information for signup with login
  const [ user, setUser ] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

const handleLogin = () => {
  login();
}

useMemo(async () => {
    const userDetails = await fetchUserprofile(user.access_token);
    console.log(userDetails);
} , [user]);

return(
        <>
        <Button variant="outline" radius="md" style={{position:'absolute', left:'30px' , top:'40px'}} onClick={() => navigate('/' , { replace: true })}>
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
        <GoogleButton  onClick={handleLogin} style={{width:'100%'}}/>
        <Divider size='sm' mt={20} mb={20} label="OR" labelPosition="center" />
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