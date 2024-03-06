import React from 'react';
import {Button, rem, Text} from '@mantine/core';
import { IChoice } from '@/types/api_types';

/**
 *  ToggleButtonProps
 */
interface ToggleButtonProps{
    // A function to update the content based on the selected choice
    updateContent: (choice: IChoice) => {},
    // choice: An object of type IChoice representing a choice
    choice: IChoice;
    // className: A string representing the CSS class name to apply to the Button component
    className: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({updateContent, choice, className}) => {
    // Renders a Button component with key set to choice.id, className set to the provided className, and variant set to "outline"
    return(
        <Button key={choice.id}
            className={className}
            variant="outline"
            // Contains an onClick event handler that triggers the updateContent function with the choice as an argument
            onClick = {() => {updateContent(choice)}}
            >
              {/* <Link href={"/"+choice}> */}
              {/* Inside the Button, a Text component is rendered with fz set to "xl", fontSize set to rem(16), whiteSpace set to "normal", and textAlign set to 'center'. The text displayed is choice.title. */}
              <Text fz = "xl" style={{fontSize: rem(16), whiteSpace: "normal", textAlign: 'center'}}>{choice.title}</Text>
              {/* </Link> */}
        </Button>
    )
}

export default ToggleButton;