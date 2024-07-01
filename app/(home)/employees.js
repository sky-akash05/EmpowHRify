// Importing necessary components from React Native and other libraries
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Importing useRouter hook from expo-router (assuming it handles navigation)
import { useRouter } from "expo-router";

// Importing SearchResults component from local file
import SearchResults from "../../components/SearchResults";

// Define the employees component
const employees = () => {
  // State variables to hold employee data and search input
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");

  // useRouter hook for navigation
  const router = useRouter();

  // useEffect hook to fetch employee data on component mount
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Logging employees data to console for debugging
  console.log(employees);

  // Rendering the UI
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header section with back button, search input, and add employee button */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => router.back()} // Navigate back on back button press
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />

          {/* Conditionally render add employee button */}
          {employees.length > 0 && (
            <View>
              <Pressable onPress={() => router.push("/(home)/adddetails")}>
                <AntDesign name="pluscircle" size={30} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {/* Displaying search results or a message if no data */}
      {employees.length > 0 ? (
        <SearchResults data={employees} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Data</Text>
          <Text>Press on the plus button and add your Employee</Text>
          <Pressable onPress={() => router.push("/(home)/adddetails")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

// Exporting the employees component as the default export
export default employees;

// Defining a StyleSheet for the component (currently empty but can be used for future styles)
const styles = StyleSheet.create({});
/* In this employees component:

The useState hook manages state variables for employees (holds employee data fetched from the server) and input (holds the value of the search input).
The useEffect hook fetches employee data from http://localhost:8000/employees when the component mounts. The fetched data is stored in the employees state.
The router from expo-router is used to handle navigation (router.back() for navigating back and router.push() for navigating to /adddetails).
The UI renders a header with a back button, search input field (TextInput), and an add employee button (AntDesign plus circle icon). Depending on whether employees array has data, it displays either the SearchResults component or a message prompting to add an employee.
The SearchResults component is passed employees data, input value, and setInput function as props to manage filtering based on user input.*/