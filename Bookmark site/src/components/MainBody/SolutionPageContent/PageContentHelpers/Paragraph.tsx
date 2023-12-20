import React from 'react'
import { Stack, createStyles, Text} from '@mantine/core';
/**
 * Paragraph component for the solution page
 * @param paragraph - the paragraph to be displayed
 */

const useStyles = createStyles((theme) => ({
  bodyText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    /* or 18px */
    color: '#74767B',
    textAlign:'left',
  },
}))

const paragraph = "This part is reserved for the brief description of the solution above. Placeholder texts are used for now.  Lorem ipsum dolor sit amet consectetur. Urna placerat a amet.Lorem ipsum dolor sit amet consectetur. Urna placerat a amet.Lorem ipsum dolor sit amet consectetur. Urna placerat a amet."

// accepts a paragraph prop (string) for the content
const Paragraph = ({paragraph}:{paragraph: string}) => {
  const { classes } = useStyles()
  // renders a Text component with the content and applies bodyText style from useStyles, wrapped in a Stack component with a backgroundColor 
  // based on the colorScheme
  return (
    <div>
      <Stack
      spacing="xl"
      // className={classes.outer}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}>
        <Text className={classes.bodyText}>
            {paragraph}
        </Text>
    </Stack>
    </div> 
  )
}

export default Paragraph