import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Nav from "@/components/Navbar/Nav";
import { Footer } from "@/components/Footer/Footer";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { FocusedBookmarkProvider } from "@/contexts/FocusedBookmarkContext";
import styles from "../styles/Home.module.css";

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
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className={styles.pageWrapper}>
          <Nav />
          <main className={styles.mainContent}>
            <FocusedBookmarkProvider>
              <BookmarkProvider>
                <Component {...pageProps} />
              </BookmarkProvider>
            </FocusedBookmarkProvider>
          </main>
          <Footer />
        </div>
      </MantineProvider>
    </>
  );
}
