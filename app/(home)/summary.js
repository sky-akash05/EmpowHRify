import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment"; // Importing moment.js for date handling
import axios from "axios"; // Axios for making HTTP requests
import { AntDesign } from "@expo/vector-icons"; // AntDesign icons from Expo
import { DataTable } from "react-native-paper"; // DataTable component from react-native-paper

const summary = () => {
  const [attendanceData, setAttendanceData] = useState([]); // State for attendance data
  const [currentDate, setCurrentDate] = useState(moment()); // State for current date using moment.js

  // Function to navigate to the next month
  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months"); // Adding 1 month to current date
    setCurrentDate(nextMonth); // Updating state with next month
  };

  // Function to navigate to the previous month
  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months"); // Subtracting 1 month from current date
    setCurrentDate(prevMonth); // Updating state with previous month
  };

  // Function to format the date into "Month, Year" format
  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  // Function to fetch attendance report data for all employees
  const fetchAttendanceReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/attendance-report-all-employees`, // API endpoint to fetch attendance report
        {
          params: {
            month: currentDate.month() + 1, // Sending current month (adding 1 because moment.js months are 0-indexed)
            year: currentDate.year(), // Sending current year
          },
        }
      );

      setAttendanceData(response.data.report); // Updating state with fetched attendance report data
    } catch (error) {
      console.log("Error fetching attendance", error); // Logging error if fetching fails
    }
  };

  useEffect(() => {
    fetchAttendanceReport(); // Fetching attendance report data when component mounts
  }, []); // Empty dependency array ensures effect runs only once on mount

  console.log(attendanceData); // Logging attendance data to console

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
        {/* Button to navigate to previous month */}
        <AntDesign
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        {/* Displaying formatted current date */}
        <Text>{formatDate(currentDate)}</Text>
        {/* Button to navigate to next month */}
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      {/* List of Attendance Data */}
      <View style={{ marginHorizontal: 12 }}>
        {attendanceData?.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            {/* Employee Info Section */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              {/* Initial letter circle */}
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
                  {item?.name?.charAt(0)}
                </Text>
              </View>
              {/* Employee details */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>

            {/* Attendance Details Section */}
            <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: "#A1FFCE", borderRadius: 5 }}>
              {/* DataTable to display attendance details */}
              <DataTable>
                {/* DataTable Header */}
                <DataTable.Header>
                  <DataTable.Title>P</DataTable.Title>
                  <DataTable.Title>A</DataTable.Title>
                  <DataTable.Title>HD</DataTable.Title>
                  <DataTable.Title>H</DataTable.Title>
                  <DataTable.Title>NW</DataTable.Title>
                </DataTable.Header>
                {/* DataTable Row with attendance data */}
                <DataTable.Row>
                  <DataTable.Cell>{item?.present}</DataTable.Cell>
                  <DataTable.Cell>{item?.absent}</DataTable.Cell>
                  <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                  <DataTable.Cell>1</DataTable.Cell>
                  <DataTable.Cell>8</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default summary;

const styles = StyleSheet.create({});
/*Inline Comments Explanation:
Imports:

Importing necessary components (StyleSheet, Text, View, ScrollView) from react-native.
Importing useState, useEffect from react for managing component state and side effects.
Importing moment for date manipulation.
Importing axios for making HTTP requests.
Importing AntDesign icon from @expo/vector-icons.
Importing DataTable component from react-native-paper for structured data display.
Component Declaration (summary):

Initializing state variables: attendanceData (for attendance report), currentDate (for displaying and manipulating dates).
Date Navigation Functions (goToNextMonth and goToPrevMonth):

goToNextMonth: Increases currentDate by 1 month.
goToPrevMonth: Decreases currentDate by 1 month.
Date Formatting (formatDate):

Formats date into "Month, Year" format using date.format("MMMM, YYYY").
Fetching Attendance Report (fetchAttendanceReport):

Makes a GET request using axios to fetch attendance report data for all employees.
Updates attendanceData state with fetched report data (response.data.report).
Logs an error message if fetching fails.
UseEffect Hook:

useEffect hook to call fetchAttendanceReport when the component mounts ([] dependency array ensures it runs only once).
Logging Attendance Data:

Logs attendanceData to the console for debugging purposes.
Rendering UI:

Provides a scrollable view (ScrollView) with a navigation bar (View) for navigating between months.
Maps through attendanceData to display employee information and their corresponding attendance details.
Each employee's details include their name, designation, and attendance details displayed using DataTable from react-native-paper.
Summary:
This summary component is designed to display an attendance summary report for all employees. It fetches data
 from an API (http://localhost:8000/attendance-report-all-employees) based on the selected month (currentDate) and renders it in a 
 structured manner using DataTable for clear presentation of attendance metrics (present, absent, halfday, H, NW).
 Users can navigate between months using left and right arrows (AntDesign icons) in the navigation bar. */