

// Importing necessary components and libraries from React Native, React, and Expo Router
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';

// Defining the index component
const index = () => {
  // Returning a Redirect component to navigate to the "/(home)" route
  return (
    <Redirect href="/(home)" />
  );
};

// Exporting the index component as the default export
export default index;

// Defining a StyleSheet for the component (currently empty but can be used for future styles)
const styles = StyleSheet.create({});


/* This `index` component acts as a redirector. When the component is rendered, it automatically
 redirects the user to the `/home` route using the `Redirect` component from `expo-router`. 
 This is useful for setting a default route or initial screen for your application.*/

// "/"