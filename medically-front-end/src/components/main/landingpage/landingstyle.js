import {createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
      position: 'relative',
      paddingTop: rem(180),
      paddingBottom: rem(165),
      backgroundImage:
        'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
     

      //Implement for small screen size
      [theme.fn.smallerThan('xs')]: {
        paddingTop: rem(80),
        paddingBottom: rem(50),
      },
    },
  
    inner: {
      position: 'relative',
      zIndex: 1,
    },
  
    title: {
      fontWeight: 800,
      fontSize: rem(40),
      letterSpacing: rem(-1),
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      color: theme.white,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: rem(28),
        textAlign: 'left',
      },
    },
  
    highlight: {
      color: theme.colors[theme.primaryColor][4],
    },
  
    description: {
      color: theme.colors.gray[0],
      textAlign: 'center',
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: theme.fontSizes.md,
        textAlign: 'left',
      },
    },
  
    controls: {
      marginTop: `calc(${theme.spacing.xl} * 1.5)`,
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
  
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column',
      },
    },
  
    control: {
      height: rem(42),
      fontSize: theme.fontSizes.md,
  
      '&:not(:first-of-type)': {
        marginLeft: theme.spacing.md,
      },
  
      [theme.fn.smallerThan('xs')]: {
        '&:not(:first-of-type)': {
          marginTop: theme.spacing.md,
          marginLeft: 0,
        },
      },
    },
  
    secondaryControl: {
      color: theme.white,
      backgroundColor: 'rgba(255, 255, 255, .4)',
  
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .45) !important',
      },
    },
  }));

export default useStyles;