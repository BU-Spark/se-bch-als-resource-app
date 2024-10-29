import React, { useState } from "react";
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
  const [isNavExpanded, setIsNavExpanded] = useState(true);

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
          <div className={`${styles.pageWrapper} ${!isNavExpanded ? styles.collapsed : ''}`}>
            <Nav 
              isExpanded={isNavExpanded} 
              onToggle={() => setIsNavExpanded(!isNavExpanded)} 
            />
            <main className={styles.mainContent}>
              <div className={styles.contentContainer}>
                <FocusedBookmarkProvider>
                  <BookmarkProvider>
                    <Component {...pageProps} />
                  </BookmarkProvider>
                </FocusedBookmarkProvider>
              </div>
            </main>
            <Footer isNavExpanded={isNavExpanded} />
          </div>
        </MantineProvider>
      </div>
    </>
  );
}