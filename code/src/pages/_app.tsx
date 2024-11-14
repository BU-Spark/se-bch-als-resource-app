import React from "react";
import Head from "next/head";

import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

import Nav from "@/components/Navbar/Nav";
import SideBar from "@/components/SideBar/SideBar";
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
    <div style={{display:"flex",flexDirection:"row",height:"100%"}}>
      <SideBar />
      <div className={styles.mainContainer}>
        <MantineProvider withGlobalStyles withNormalizeCSS>

        <div className="main" style={{flexGrow:1,display:"flex",flexDirection:"column",width:"100%"}}>
          <Nav />

          <div className={styles.content}>
            <FocusedBookmarkProvider>
              <BookmarkProvider>
          <Component {...pageProps} />
              </BookmarkProvider>
            </FocusedBookmarkProvider>
          </div>

         <Footer />
          </div>
        </MantineProvider>
      </div>
    </div>
    </>
  );
}
