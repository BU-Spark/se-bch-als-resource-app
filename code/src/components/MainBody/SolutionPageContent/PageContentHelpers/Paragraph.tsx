import React from 'react'
import { Stack, createStyles, rem , Text, AspectRatio } from '@mantine/core';


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


const Paragraph = ({paragraph}:{paragraph: string}) => {
  const { classes } = useStyles()
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