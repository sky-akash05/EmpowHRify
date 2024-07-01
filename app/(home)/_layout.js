// Importing the Stack component from expo-router
import { Stack } from "expo-router";

// Defining the Layout component
export default function Layout() {
  // Returning a Stack component to manage navigation within the app
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Defining different screens within the Stack */}
      <Stack.Screen name="index" />
      <Stack.Screen name="employees" />
      <Stack.Screen name="adddetails" />
      <Stack.Screen name="markattendance" />
      <Stack.Screen name="[user]" />
      <Stack.Screen name="summary" />
    </Stack>
  );
}
/*This Layout component sets up a stack navigator using expo-router. The screenOptions prop is
 used to hide the header for all screens in the stack. Each Stack.Screen component represents 
 a different screen in the app, with the name prop defining the route for that screen. This
  layout helps manage navigation between different parts of the application, such as the index, 
  employees list, adding details, marking attendance, user-specific screens, and summary screens */
