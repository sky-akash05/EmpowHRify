// Importing the StatusBar component from the 'expo-status-bar' package
import { StatusBar } from "expo-status-bar";
// Importing StyleSheet, Text, and View components from 'react-native' package
import { StyleSheet, Text, View } from "react-native";

// Default export function for the main App component
export default function App() {
  return (
    // Using the View component as the main container for the app, with styles applied
    <View style={styles.container}>
      {/* Displaying a Text component with a simple message */}
      <Text>Open up App.js to start working on your app!</Text>
      {/* Using the StatusBar component to control the app's status bar appearance */}
      <StatusBar style="auto" />
    </View>
  );
}

// Creating a StyleSheet object to define styles for the app
const styles = StyleSheet.create({
  // Defining a style for the main container
  container: {
    // Setting the flex property to 1 to make the container fill the entire screen
    flex: 1,
    // Setting the background color of the container to white
    backgroundColor: "#fff",
    // Aligning child components in the center horizontally
    alignItems: "center",
    // Aligning child components in the center vertically
    justifyContent: "center",
  },
});

//This app.json file configures various settings for an Expo React Native application, such as the app name, version, orientation, icons, splash screen, and platform-specific settings for iOS and Android. It also includes asset bundling patterns and plugins used by the app.




//The `yarn.lock` file ensures consistent dependency versions across different installations by 
//locking the exact versions of the packages installed.




/*    88888888888888888888888888888888888888 package.json details    8888888888888888888888888888888888
{
  // The name of the project
  "name": "employee-yt",
  // The version of the project
  "version": "1.0.0",
  // The entry point for the project, configured to use Expo Router
  "main": "expo-router/entry",
  // Scripts that can be run from the command line using npm or yarn
  "scripts": {
    // Script to start the Expo development server
    "start": "expo start",
    // Script to start the Expo development server and open the Android emulator
    "android": "expo start --android",
    // Script to start the Expo development server and open the iOS simulator
    "ios": "expo start --ios",
    // Script to start the Expo development server and open the web version of the app
    "web": "expo start --web"
  },
  // Dependencies required for the project to run
  "dependencies": {
    // Library for making HTTP requests
    "axios": "^1.6.0",
    // Core Expo library
    "expo": "~49.0.15",
    // Provides system information constants
    "expo-constants": "~14.4.2",
    // Library for creating linear gradients
    "expo-linear-gradient": "~12.3.0",
    // Library for handling deep linking in Expo
    "expo-linking": "~5.0.2",
    // Router library for Expo projects
    "expo-router": "^2.0.0",
    // Provides a React component for the status bar
    "expo-status-bar": "~1.6.0",
    // Library for parsing, validating, manipulating, and displaying dates and times
    "moment": "^2.29.4",
    // Core React library
    "react": "18.2.0",
    // Core React Native library
    "react-native": "0.72.6",
    // Library for handling gestures in React Native
    "react-native-gesture-handler": "~2.12.0",
    // Library for using Material Design components in React Native
    "react-native-paper": "^5.11.1",
    // Provides safe area boundaries in React Native
    "react-native-safe-area-context": "4.6.3",
    // Library for handling screen navigation in React Native
    "react-native-screens": "~3.22.0"
  },
  // Development dependencies required for building the project
  "devDependencies": {
    // Core Babel library for transpiling JavaScript
    "@babel/core": "^7.20.0"
  },
  // Specifies that this project is private and should not be published to a package registry
  "private": true
}

*/