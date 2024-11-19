import React from 'react';
import { Notification, Button, Text, CloseButton } from '@mantine/core';
import { Cookie } from 'lucide-react';

interface CookieConsentProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ isOpen, onClose }) => {
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: '1200px',
      maxWidth: '95vw',
      marginBottom: '20px'
    }}>
      <Notification
        className="p-4"
        withCloseButton={false}
        styles={(theme) => ({
          root: {
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '24px',
            position: 'relative', // Added for absolute positioning of close button
          },
          body: {
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '24px',
            alignItems: 'center'
          },
          description: {
            padding: 0,
            margin: 0
          }
        })}
      >
        {/* Close Button */}
        <CloseButton
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            color: '#666'
          }}
        />

        <Cookie
          size={40}
          color="#666"
          style={{
            minWidth: '40px',
            marginLeft: '4px'
          }}
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <Text size="md" style={{
            color: '#000',
            fontSize: '16.5px',
            lineHeight: '1.5',
            marginRight: '40px'
          }}>
            We use essential cookies to enable bookmarking and improve your browsing experience. We promise that no personally identifying information is collected or stored. By continuing to use this site, you accept our use of cookies.
          </Text>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button
              variant="filled"
              onClick={handleAccept}
              size="md"
              styles={{
                root: {
                  backgroundColor: '#0A1E3F',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '8px 24px',
                  height: '44px',
                  fontSize: '15px',
                  minWidth: '160px',
                  '&:hover': {
                    backgroundColor: '#162B4D'
                  }
                }
              }}
            >
              Accept cookies
            </Button>
          </div>
        </div>
      </Notification>
    </div>
  );
};

export default CookieConsent;