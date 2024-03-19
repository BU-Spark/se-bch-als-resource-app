import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import React from "react";
import Nav from "@/components/Navbar/Nav";
import { FooterLinks } from "@/components/Footer/Footer";
import { BookmarkProvider } from "@/contexts/BookmarkContext";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>ALS Resource App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={
          {
            /** Put your mantine theme override here */
            // colorScheme: 'dark',
          }
        }
      >
        <Nav></Nav>
        <BookmarkProvider>
          <Component {...pageProps} />
        </BookmarkProvider>

        <FooterLinks />
      </MantineProvider>
    </>
  );
}
