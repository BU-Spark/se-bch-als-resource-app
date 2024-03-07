import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Stack, Text } from '@mantine/core';
import { bodyContentUseStyles } from '../MainBody/HelperFunctions/BodyContentStyle'; // Update the path as necessary

const BookmarkButton = ({ pageTitle, pageIdentifier, userId, isSolutionPage }) => {
  const { classes } = bodyContentUseStyles();
  const [showBookmarkQuestion, setShowBookmarkQuestion] = useState(false);

  const handleBookmark = async () => {
    if (!userId) {
      console.error('User ID not available');
      return;
    }
  
    const bookmarkData = {
      Title: pageTitle,
      identifier: pageIdentifier,
      users_permissions_user: userId
    };
  
    console.log('Sending bookmark data:', bookmarkData); // Log the data being sent
  
    try {
      const response = await axios.post('http://localhost:1338/api/bookmarks', {
        data: bookmarkData,
      });
      console.log('Bookmark saved:', response.data);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };
  

  if (!isSolutionPage) {
    return null;
  }

  return (
    <div className={classes.outer}>
      {showBookmarkQuestion ? (
        <Stack spacing="xl">
          <Text className={classes.text}>Do you want to save this to your account?</Text>
          <Stack direction="row" spacing="md">
            <Button 
              className={classes.inner} 
              onClick={handleBookmark}
              variant="outline"
              style={{ backgroundColor: '#FFFFFF', color: '#254885' }}>
              Yes
            </Button>
            <Button 
              className={classes.inner} 
              onClick={() => setShowBookmarkQuestion(false)}
              variant="outline"
              style={{ backgroundColor: '#FFFFFF', color: '#254885' }}>
              No
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Button 
          className={classes.inner} 
          onClick={() => setShowBookmarkQuestion(true)}
          variant="outline"
          style={{ backgroundColor: '#FFFFFF', color: '#254885' }}>
          Bookmark this page
        </Button>
      )}
    </div>
  );
};

export default BookmarkButton;
