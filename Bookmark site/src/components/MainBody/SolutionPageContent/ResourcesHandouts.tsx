import React from 'react'
import { Stack, createStyles, rem , Text, Button } from '@mantine/core';
import { ResourceLink } from '@/types/dataTypes';
import { IconFileDescription } from '@tabler/icons-react';

/**
 * Resources component for the solution page
 * @param title - the title of the resources section
 */



const useStyles = createStyles((theme) => ({
  inner: {
    height: '57px',
    display: 'flex',
    width: '100%',
    // backgroundColor: 'transparent',
    color: '#254885',
    border: '2px solid #254885',
    borderRadius: rem(10),
    // width: rem(320),
    justifyContent: 'start',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',

  //   [theme.fn.smallerThan('xs')]: {
  //     '&:hover': {
  //       backgroundColor: '#254885',  color: "#FFFFFF", text:  '#254885',
  //   },
  // },
  },

  text: {
    fontWeight: 600,
    paddingTop: rem(12),
    width: '80%',
    fontSize: rem(20),
    fontStyle: 'normal',
    letterSpacing: rem(-1),
    color: '#254885',
    // marginBottom: theme.spacing.xs,
    textAlign: 'left',
    fontFamily: `Montserrat, ${theme.fontFamily}`,
    // lineHeight: rem(16),
    // media query for smaller than 'xs' screen sizes (fontSize, textAlign, width)
    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(20),
      textAlign: 'left',
      width: '80%'
    },
  },

  outer: {
    paddingTop: rem(24),
    pddingBottom: rem(24),
    paddingLeft: '10%',
  },
}))

// Resources component accepts a title prop (string) and a data prop (ResourceLink[])
const Resources = ({title, data}: {title: String,data: ResourceLink[]}) => {
  const { classes } = useStyles()
  // Iterates through the data array and renders a Button component for each resource
  // Button component has a leftIcon and is styled with the inner class from useStyles
  // Wrapped in a Stack component with spacing set to "xl"

  return (
    <div>
      <Stack
      spacing="xl"
    >
      <Text className={classes.text}> {title} </Text>
      {data.map((resource) => (  
        <Button key={resource.id}
          className={classes.inner}
          variant="outline"
          leftIcon = {<IconFileDescription color='#254885'/>}
          component = "a"
          href = {resource.url} 
          target="_blank"
          >
            {resource.title}
        </Button>
      ))}
    </Stack>
    </div> 
  )
}

export default Resources