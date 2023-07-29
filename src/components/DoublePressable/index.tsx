// Import necessary components and types from 'react-native' and 'react'
import {Pressable} from 'react-native';
import React, {ReactNode} from 'react';

// Define the interface for the props of the DoublePressable component
interface IDoublePressable {
  // Optional callback function to be executed on double press
  onDoublePress?: () => void;
  // Content or child components of the DoublePressable component
  children: ReactNode;
}

// DoublePressable Component
const DoublePressable = ({
  // Destructure the props, set onDoublePress default to an empty function
  onDoublePress = () => {},
  children, // Children components of the DoublePressable
}: IDoublePressable) => {
  // Local variable to store the timestamp of the last tap
  let lastTap = 0;

  // Function to handle the double press event
  const handleDoublePress = () => {
    // Get the current timestamp
    const now = Date.now(); // timestamp from 1970

    // Check if the time difference between the current tap and the last tap is less than 300 milliseconds
    // If true, execute the onDoublePress callback
    if (now - lastTap < 300) {
      onDoublePress();
    }

    // Update the lastTap variable to store the current timestamp
    lastTap = now;
  };

  // Wrap the children components with the Pressable component
  // Attach the handleDoublePress function to the onPress event of the Pressable
  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};

// Export the DoublePressable component as the default export of the module
export default DoublePressable;
