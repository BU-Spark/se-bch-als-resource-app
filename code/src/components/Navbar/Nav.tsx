import React from 'react'
import {useState} from 'react';
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

  const [opened, setOpened] = useState(false);

  const toggleMenu = () => {
    setOpened(!opened);
  };

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
        <Burger size="lg" color="#254885" opened={opened} onClick={toggleMenu} />
        {opened && (
        <div style={{
          position: 'absolute',
          top: '50px', // Adjust based on the height of the Burger
          left: '0',
          width: '100%', // Adjust the width as needed
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 1000,
          backgroundColor: '#fff',
        }}>
          <ul style={{
            listStyleType: 'none',
            margin: '0',
            padding: '0',
          }}>
            <li style={{
              padding: '10px 20px',
              borderBottom: '1px solid #ddd',
            }}>
              <Link href="/" style={{
                  textDecoration: 'none',
                  color: '#254885',
                  display: 'block',
                }} onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li style={{
              padding: '10px 20px',
            }}>
              <Link href="/bookmarks" style={{
                  textDecoration: 'none',
                  color: '#254885',
                  display: 'block',
                }} onClick={toggleMenu}>
                Bookmarks
              </Link>
            </li>
          </ul>
        </div>
      )}
      </Container>
      </Header>
    )
  
}

export default Nav