import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import React from "react";
import Nav from "@/components/Navbar/Nav";
import { Footer } from "@/components/Footer/Footer";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import styles from '../styles/Home.module.css'; // Assuming your styles are here

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>

      <MantineProvider withGlobalStyles withNormalizeCSS>

        <Nav />
      

        <div className={styles.content}>

          <BookmarkProvider>
            <Component {...pageProps} />
          </BookmarkProvider>
          </div>


    
          <Footer />
       
       
      </MantineProvider>
      </div>
    
    </>
  );
}
