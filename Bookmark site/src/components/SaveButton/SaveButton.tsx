// components/SaveButton.tsx
import React from 'react';
import { Button, createStyles} from '@mantine/core';

const useStyles = createStyles({
  saveButton: {
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.3s',
    },
    '&:active': {
      backgroundColor: 'pink',
    },
  },
});

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  const {classes} = useStyles();

  return (
    <Button
      onClick={onClick}
      className={classes.saveButton}
      size="sm"
      color="blue"
    >
      Save
    </Button>
  );
};

export default SaveButton;
