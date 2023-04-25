import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
  } from '@mantine/core';
  import { MantineLogo } from '@mantine/ds';
  import { useDisclosure } from '@mantine/hooks';
import {useStyles , mockdata} from './headerstyle'
import { useNavigate } from 'react-router-dom';


export function Headbar() {

    const navigate = useNavigate();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();
  
    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
  
    return (
      <Box>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
            <Group>
               <h3>Medically🧑‍⚕️</h3>
            </Group>
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <a href="#" className={classes.link}>
                Home
              </a>
            </Group>
  
            <Group className={classes.hiddenMobile}>
              <Button variant="default" onClick={() => navigate('/login')}>Log in</Button>
              <Button onClick={() => navigate('/signup')}>Sign up</Button>
            </Group>
            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Medically❤️"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <a href="#" className={classes.link}>
              Home
            </a>
            <Collapse in={linksOpened}>{links}</Collapse>
  
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <Group position="center" grow pb="xl" px="md">
              <Button variant="default" onClick={() => navigate('/login')}>Log in</Button>
              <Button onClick={() => navigate('/signup')}>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }