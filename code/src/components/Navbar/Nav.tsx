import React from 'react'
import { createStyles, Header, Container, Group, Burger, Image, rem} from '@mantine/core';

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
    return (
      <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
        <Container className={classes.inner} fluid>
          <Group>
            <Image maw={100} mah={120} ml={32} mx="auto" radius="md" src="../Boston_Children's_Hospital_logo..png" alt="Random image" />
          </Group>
          <Burger size="lg" color="#254885" opened={false} />
        </Container>
      </Header>
  )
  
}

export default Nav