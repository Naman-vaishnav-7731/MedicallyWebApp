import { createStyles ,  rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: rem(100),
      backgroundSize: 'contain',
      backgroundImage:
        'url(https://images.pexels.com/photos/7089387/pexels-photo-7089387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
    },
  
    form: {
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: rem(600),
      maxWidth: rem(450),
      paddingTop: rem(80),
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  }));

export default useStyles;
  