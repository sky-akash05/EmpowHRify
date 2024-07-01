import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment"; // Importing moment.js for date handling
import axios from "axios"; // Axios for making HTTP requests
import { AntDesign } from "@expo/vector-icons"; // AntDesign icons from Expo
import { useRouter } from "expo-router"; // useRouter hook from expo-router for navigation

const markattendance = () => {
  const router = useRouter(); // Initializing useRouter hook for navigation
  const [currentDate, setCurrentDate] = useState(moment()); // State for current date using moment.js

  // Function to navigate to the next day
  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days"); // Adding 1 day to current date
    setCurrentDate(nextDate); // Updating state with next date
  };

  // Function to navigate to the previous day
  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days"); // Subtracting 1 day from current date
    setCurrentDate(prevDate); // Updating state with previous date
  };

  // Function to format the date into "Month Day, Year" format
  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  // State to store list of employees fetched from server
  const [employees, setEmployees] = useState([]);

  // useEffect hook to fetch employee data when component mounts
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employees"); // Making GET request to fetch employees
        setEmployees(response.data); // Updating state with fetched employee data
      } catch (error) {
        console.log("error fetching employee data", error); // Logging error if fetching fails
      }
    };
    fetchEmployeeData(); // Calling fetchEmployeeData function
  }, []); // Empty dependency array ensures effect runs only once on mount

  // State to store attendance data for current date
  const [attendance, setAttendance] = useState([]);

  // Function to fetch attendance data based on currentDate
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/attendance`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"), // Passing formatted date as query parameter
        },
      });
      setAttendance(response.data); // Updating state with fetched attendance data
    } catch (error) {
      console.log("error fetching attendance data", error); // Logging error if fetching fails
    }
  };

  // useEffect hook to fetch attendance data whenever currentDate changes
  useEffect(() => {
    fetchAttendanceData(); // Calling fetchAttendanceData function
  }, [currentDate]); // Dependency array ensures effect runs whenever currentDate changes

  // Mapping through employees to add attendance status to each employee
  const employeeWithAttendance = employees.map((employee) => {
    // Finding attendance record for current employee based on employeeId
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // Assigning attendance status or defaulting to empty string if not found
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable>
        {/* Date Navigation Section */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
          }}
        >
          {/* Button to navigate to previous day */}
          <AntDesign
            onPress={goToPrevDay}
            name="left"
            size={24}
            color="black"
          />
          <Text>{formatDate(currentDate)}</Text> {/* Displaying formatted date */}
          {/* Button to navigate to next day */}
          <AntDesign
            onPress={goToNextDay}
            name="right"
            size={24}
            color="black"
          />
        </View>

        {/* List of Employees with Attendance */}
        <View style={{ marginHorizontal: 12 }}>
          {employeeWithAttendance.map((item, index) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/[user]", // Navigating to dynamic route based on employee name
                  params: {
                    name: item.employeeName, // Passing employee details as params
                    id: item.employeeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  },
                })
              }
              key={index} // Using index as key for Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              {/* Circle with initial letter of employee name */}
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4b6cb7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item?.employeeName?.charAt(0)} {/* Displaying first letter of employee name */}
                </Text>
              </View>

              {/* Employee Details */}
              <View style={{flex:1}}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.employeeName} {/* Displaying employee name */}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId}) {/* Displaying designation and employeeId */}
                </Text>
              </View>

              {/* Attendance Status Indicator */}
              {item?.status && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#FF69B4",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    {item.status.charAt(0)} {/* Displaying first letter of attendance status */}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
};

export default markattendance;

const styles = StyleSheet.create({});
/*Inline Comments Explanation:
Imports:

Importing necessary components (Pressable, StyleSheet, Text, View) from react-native.
Importing useState, useEffect from react for managing component state and side effects.
Importing moment for date manipulation.
Importing axios for making HTTP requests.
Importing AntDesign icon from @expo/vector-icons.
Importing useRouter hook from expo-router for navigation.
Component Declaration (markattendance):

Initializing router using useRouter hook for navigation.
State Management:

Using useState to manage currentDate state initialized with current date using moment().
Date Navigation Functions (goToNextDay and goToPrevDay):

goToNextDay: Increments currentDate by 1 day.
goToPrevDay: Decrements currentDate by 1 day.
Date Formatting (formatDate):

Formats date into "Month Day, Year" format using date.format("MMMM D, YYYY").
Fetching Employee Data (fetchEmployeeData):

Uses axios to fetch employee data from http://localhost:8000/employees.
Updates employees state with fetched data.
useEffect ensures data fetching happens once on component mount ([] dependency array).
Fetching Attendance Data (fetchAttendanceData):

Uses axios to fetch attendance data from http://localhost:8000/attendance for currentDate.
Updates attendance state with fetched data.
useEffect runs whenever currentDate changes, ensuring attendance data is fetched for the selected date.
Mapping Employees with Attendance (employeeWithAttendance):

Maps through employees array to add status (attendance record) for each employee.
Finds corresponding attendanceRecord based on employeeId.
Rendering UI:

Displays a scrollable list of employees with their initial letter, name, designation, and attendance status.
Each employee item is wrapped in a Pressable component that navigates to a dynamic route (/[user]) on press.
Icons (AntDesign) are used for navigating to the previous and next day.
Summary:
This component (markattendance) provides a UI for marking attendance in an Employee Management System. It fetches employee
 and attendance data from a server (http://localhost:8000/employees and http://localhost:8000/attendance), allows navigation 
 between dates, and displays employee details with their attendance status. Navigation to individual
 employee details is facilitated using the useRouter hook from expo-router */
