import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import React from 'react'
import Nav from '@/components/Navbar/Nav';
import { FooterLinks } from '@/components/Footer/Footer';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <> 
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          // colorScheme: 'dark',
        }}
      >
        <Nav></Nav>
        <Component {...pageProps} />
        <FooterLinks />
      </MantineProvider>
    </>
  );
}