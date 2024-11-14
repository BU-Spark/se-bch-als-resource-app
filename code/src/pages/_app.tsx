import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { AppProps } from "next/app";
import { MantineProvider, Notification, Button } from "@mantine/core";
import Nav from "@/components/Navbar/Nav";
import { Footer } from "@/components/Footer/Footer";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { FocusedBookmarkProvider } from "@/contexts/FocusedBookmarkContext";
import styles from "../styles/Home.module.css";
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookieAccepted');
    if (!hasAccepted) {
      setShowCookieNotice(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setShowCookieNotice(false);
  };

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
          <Notifications position="bottom-right" />
          <div className={`${styles.pageWrapper} ${isNavExpanded ? styles.collapsed : ''}`}>
            <Nav
              isExpanded={!isNavExpanded}
              onToggle={() => setIsNavExpanded(!isNavExpanded)}
            />
            <div className={styles.mainContent}>
              <div className={styles.contentContainer}>
                <header className={styles.header}>
                  <div className={styles.inner}>
                    <div className={styles.logoContainer}>
                      <Image
                        src="/Boston_Children's_Hospital_logo.png"
                        alt="Boston Children's Hospital"
                        width={250}
                        height={100}
                        priority
                      />
                    </div>
                  </div>
                </header>
                <FocusedBookmarkProvider>
                  <BookmarkProvider>
                    <Component {...pageProps} />
                  </BookmarkProvider>
                </FocusedBookmarkProvider>
              </div>
            </div>
            <Footer isNavExpanded={!isNavExpanded} />

            {/* Cookie Notice */}
            {showCookieNotice && (
              <div style={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                width: '90%',
                maxWidth: '600px',
              }}>
                <Notification
                  color="blue"
                  onClose={handleAccept}
                  closeButtonProps={{ 'aria-label': 'Hide notification' }}
                  style={{
                    backgroundColor: 'white',
                    border: '2px solid #254885',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    <div style={{ color: '#254885' }}>
                      This website uses cookies to enhance the user experience.
                    </div>
                    <Button
                      variant="outline"
                      style={{
                        color: '#254885',
                        borderColor: '#254885'
                      }}
                      onClick={handleAccept}
                    >
                      I know
                    </Button>
                  </div>
                </Notification>
              </div>
            )}
          </div>
        </MantineProvider>
      </div>
    </>
  );
}