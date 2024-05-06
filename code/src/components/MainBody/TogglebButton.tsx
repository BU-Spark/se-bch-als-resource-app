import React from 'react';
import {Button, rem, Text} from '@mantine/core';
import { bodyContentUseStyles } from './HelperFunctions/BodyContentStyle';


interface ToggleButtonProps{
    title: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({title}) => {
    const { classes } = bodyContentUseStyles();

    return(
        <Button key={"Toogle Button"}
            className={classes.inner}
            variant="outline"
        >
            <Text fz = "xl" style={{fontSize: rem(16), whiteSpace: "normal", textAlign: 'center'}}>{title}</Text>
        </Button>
    )
}

export default ToggleButton;