// Importing necessary components and libraries from React Native, React, Expo Router, moment, and vector icons
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

// Defining the user component
const user = () => {
  // Using useLocalSearchParams hook to get parameters from the local navigation state
  const params = useLocalSearchParams();
  // State variables for attendance status and current date
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [currentDate, setCurrentDate] = useState(moment());

  // Function to navigate to the next day
  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  // Function to navigate to the previous day
  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  // Function to format the date
  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  // Function to submit attendance
  const submitAttendance = async () => {
    try {
      const attendanceData = {
        employeeId: params?.id,
        employeeName: params?.name,
        date: currentDate.format("MMMM D, YYYY"),
        status: attendanceStatus,
      };
      const response = await axios.post(
        "http://localhost:8000/attendance",
        attendanceData
      );

      // Showing an alert if attendance submission is successful
      if (response.status === 200) {
        Alert.alert(`Attendance submitted successfully for ${params?.name}`);
      }
    } catch (error) {
      console.log("error submitting attendance", error);
    }
  };

  // Rendering the UI
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Navigation controls for date */}
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
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>

      {/* Employee information */}
      <Pressable
        style={{
          marginVertical: 10,
          marginHorizontal: 12,
          flexDirection: "row",
          gap: 10,
        }}
      >
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
            {params?.name.charAt(0)}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {params?.name}
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            {params?.designation} ({params?.id})
          </Text>
        </View>
      </Pressable>

      {/* Displaying basic pay */}
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 12 }}>
        Basic Pay : {params?.salary}
      </Text>

      {/* Attendance options */}
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            letterSpacing: 3,
            marginTop: 7,
          }}
        >
          ATTENDANCE
        </Text>
        {/* Attendance status options */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          {/* Pressable for Present */}
          <Pressable
            onPress={() => setAttendanceStatus("present")}
            style={{
              backgroundColor: "#C4E0E5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "present" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Present</Text>
          </Pressable>

          {/* Pressable for Absent */}
          <Pressable
            onPress={() => setAttendanceStatus("absent")}
            style={{
              backgroundColor: "#C4E0E5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "absent" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Absent</Text>
          </Pressable>
        </View>

        {/* More attendance options */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          {/* Pressable for Half Day */}
          <Pressable
            onPress={() => setAttendanceStatus("halfday")}
            style={{
              backgroundColor: "#C4E0E5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "halfday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Half Day</Text>
          </Pressable>

          {/* Pressable for Holiday */}
          <Pressable
            onPress={() => setAttendanceStatus("holiday")}
            style={{
              backgroundColor: "#C4E0E5",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "holiday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Holiday</Text>
          </Pressable>
        </View>

        {/* Additional input fields */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {/* TextInput for Advance / Loans */}
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#E0E0E0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Advance / Loans"
          />
          {/* TextInput for Extra Bonus */}
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#E0E0E0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Extra Bonus"
          />
        </View>

        {/* Button to submit attendance */}
        <Pressable
          onPress={submitAttendance}
          style={{
            padding: 15,
            backgroundColor: "#00c6ff",
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 6,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "500" }}
          >
            Submit Attendance
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

// Exporting the user component as the default export
export default user;

// Defining a StyleSheet for the component (currently empty but can be used for future styles)
const styles = StyleSheet.create({});

/*This user component renders a user-specific attendance interface. It allows navigation through dates, selection of attendance status, input of additional details (like advance/loans and extra bonus), and submission of attendance data via an HTTP POST request using Axios. The component utilizes various UI components from React Native, handles state using hooks (useState), and interacts with navigation parameters (useLocalSearchParams from expo-router). */