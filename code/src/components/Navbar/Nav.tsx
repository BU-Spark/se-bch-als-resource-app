import React from 'react'
import { createStyles, Header, Container, Group, Burger, rem} from '@mantine/core';
import Image from 'next/image'
import Link from 'next/link';

/**
 *  Nav component for the navigation bar
 */

//A constant for the height of the header component, set to rem(64)
const HEADER_HEIGHT = rem(64);

const useStyles = createStyles(() => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  }
}))


const Nav = () => {
  const { classes } = useStyles();
  // Renders a Header component with a height of HEADER_HEIGHT, borderBottom set to 0, borderTop set to 4, and withBorder enabled Wrapped in a Container component with the inner class from useStyles and fluid property
    return (
      <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container className={classes.inner} fluid>
        <Group>
          <Link href="/">
        <Image
          src="/Boston_Children's_Hospital_logo.png"
          alt="BCH Logo"
          width={110}
          height={50}
          style={{paddingLeft: "10px"}}
        />
        </Link>
        </Group>
        <Burger size="lg" color="#254885" opened={false} />
      </Container>
      </Header>
    )
  
}

export default Nav