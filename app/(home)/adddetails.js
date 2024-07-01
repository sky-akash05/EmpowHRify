// Importing necessary components from React Native
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

// Importing React and useState hook from React
import React, { useState } from "react";

// Importing axios for making HTTP requests
import axios from "axios";

// Define the adddetails component
const adddetails = () => {
  // State variables to hold form input values
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");

  // Function to handle registration of new employee
  const handleRegister = () => {
    // Data object to send in POST request
    const employeeData = {
      employeeName: name,
      employeeId: employeeId,
      designation: designation,
      phoneNumber: mobileNo,
      dateOfBirth: dob,
      joiningDate: joiningDate,
      activeEmployee: true,
      salary: salary,
      address: address,
    };

    // Axios POST request to addEmployee endpoint
    axios
      .post("http://localhost:8000/addEmployee", employeeData)
      .then((response) => {
        // Alert if registration is successful
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );

        // Clearing input fields after successful registration
        setName("");
        setEmployeeId("");
        setDob("");
        setMobileNo("");
        setSalary("");
        setAddress("");
        setJoiningDate("");
        setDesignation("");
      })
      .catch((error) => {
        // Alert if registration fails
        Alert.alert("Registration Fail", "An error occurred during registration");
        console.log("register failed", error);
      });
  };

  // Rendering the UI
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a New Employee
        </Text>

        {/* Input fields for various employee details */}
        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Full Name"
          placeholderTextColor={"black"}
        />

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={employeeId}
          onChangeText={(text) => setEmployeeId(text)}
          placeholder="Employee Id"
          placeholderTextColor={"black"}
        />

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={designation}
          onChangeText={(text) => setDesignation(text)}
          placeholder="Designation"
          placeholderTextColor={"black"}
        />

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={mobileNo}
          onChangeText={(text) => setMobileNo(text)}
          placeholder="Mobile Number"
          placeholderTextColor={"black"}
        />

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={dob}
          onChangeText={(text) => setDob(text)}
          placeholder="Date of Birth"
          placeholderTextColor={"black"}
        />

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={joiningDate}
          onChangeText={(text) => setJoiningDate(text)}
          placeholder="Joining Date"
          placeholderTextColor={"black"}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text>Active Employee</Text>
          <Text>True</Text>
        </View>

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={salary}
          onChangeText={(text) => setSalary(text)}
          placeholder="Salary"
          placeholderTextColor={"black"}
        />

        <TextInput
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
          placeholderTextColor={"black"}
        />

        {/* Button to add employee */}
        <Pressable
          onPress={handleRegister}
          style={{
            backgroundColor: "#ABCABA",
            padding: 10,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Add Employee
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// Exporting the adddetails component as the default export
export default adddetails;

// Defining a StyleSheet for the component (currently empty but can be used for future styles)
const styles = StyleSheet.create({});


/*This adddetails component provides a form to add new employee details, including name, employee ID, date of birth, mobile number, joining date, salary, address, and designation. Upon pressing the "Add Employee" button, it sends a POST request to http://localhost:8000/addEmployee with the provided data using Axios. After successful registration, it displays an alert and clears the input fields. */