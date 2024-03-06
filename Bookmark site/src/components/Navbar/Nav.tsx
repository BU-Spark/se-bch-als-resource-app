import React from 'react'
import { createStyles, Header, Container, Group, Burger, Image, rem} from '@mantine/core';

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
        {/* Contains a Group component with an Image component inside, which has properties like maw, mah, ml, mx, radius, src, and alt */}
          <Group>
            <Image maw={100} mah={120} width={120} height={60} ml={32} mx="auto" radius="md" src="../Boston_Children's_Hospital_logo..png" alt="Random image" />
          </Group>
          {/* Also contains a Burger component with properties like size and color, and opened set to false */}
          <Burger size="lg" color="#254885" opened={false} />
        </Container>
      </Header>
  )
  
}

export default Nav