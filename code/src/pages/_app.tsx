import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { AppProps } from "next/app";
import { MantineProvider, Modal, Button, Title, Text } from "@mantine/core";
import { X } from 'lucide-react';
import Nav from "@/components/Navbar/Nav";
import { Footer } from "@/components/Footer/Footer";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { FocusedBookmarkProvider } from "@/contexts/FocusedBookmarkContext";
import styles from "../styles/Home.module.css";
import { Notifications } from '@mantine/notifications';
import CookieConsent from '@/components/CookieConsent';
import '../styles/globals.css';

// Main App component
export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  // State for navigation, welcome modal, and cookie consent
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [showCookieNotice, setShowCookieNotice] = useState(true);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  // Handle cookie consent acceptance
  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieNotice(false);
  };

  return (
    <>
      {/* Set up head tags for metadata and page title */}
      <Head>
        <title>ALS Resource App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main app container */}
      <div className={styles.mainContainer}>
        {/* MantineProvider for styling and global configuration */}
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {/* Notifications for displaying alerts */}
          <Notifications position="bottom-right" />

          {/* Welcome modal displayed when the app is first opened */}
          <Modal
            opened={isWelcomeOpen}
            onClose={() => setIsWelcomeOpen(false)}
            withCloseButton={false}
            centered
            size="lg"
            padding={0}
            radius="lg"
            zIndex={1000}
            styles={{
              inner: { padding: '16px' },
              body: {
                padding: '48px 64px',
                position: 'relative'
              },
              content: {
                backgroundColor: 'white',
                borderRadius: '24px',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            {/* Close button for the welcome modal */}
            <button
              onClick={() => setIsWelcomeOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={24} color="#1a1b1e" />
            </button>

            {/* Modal content: welcome message and acknowledgment button */}
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <Title
                order={1}
                style={{
                  fontSize: '32px',
                  color: '#1a1b1e',
                  marginBottom: '24px',
                  textAlign: 'left'
                }}
              >
                Hello!
              </Title>

              <Text
                size="lg"
                style={{
                  color: '#666',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                  textAlign: 'left'
                }}
              >
                Welcome to Boston Children&#39;s Hospital&#39;s ALS resource website. Please note that the information provided on this website is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for personalized medical guidance.
              </Text>

              {/* Button to close the welcome modal */}
              <div style={{ textAlign: 'left' }}>
                <Button
                  onClick={() => setIsWelcomeOpen(false)}
                  size="lg"
                  styles={{
                    root: {
                      backgroundColor: '#0A1E3F',
                      borderRadius: '25px',
                      padding: '0 48px',
                      height: '50px',
                      '&:hover': {
                        backgroundColor: '#162B4D'
                      }
                    },
                    label: {
                      fontSize: '16px',
                      fontWeight: 600
                    }
                  }}
                >
                  I Understand
                </Button>
              </div>
            </div>
          </Modal>

          {/* Page layout with navigation and footer */}
          <div className={`${styles.pageWrapper} ${isNavExpanded ? styles.collapsed : ''}`}>
            {/* Navigation bar with toggle option */}
            <Nav
              isExpanded={!isNavExpanded}
              onToggle={() => setIsNavExpanded(!isNavExpanded)}
            />

            {/* Main content area */}
            <div className={styles.mainContent}>
              <div className={styles.contentContainer}>
                {/* Header with logo */}
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

                {/* Wrapping the main component with context providers */}
                <FocusedBookmarkProvider>
                  <BookmarkProvider>
                    <Component {...pageProps} />
                  </BookmarkProvider>
                </FocusedBookmarkProvider>
              </div>
            </div>

            {/* Footer component */}
            <Footer isNavExpanded={!isNavExpanded} />

            {/* Cookie consent banner */}
            <CookieConsent
              isOpen={showCookieNotice}
              onClose={handleCookieAccept}
            />
          </div>
        </MantineProvider>
      </div>
    </>
  );
}
