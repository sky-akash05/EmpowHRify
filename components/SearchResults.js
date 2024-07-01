

// Importing necessary components and libraries from React Native and React
import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

// Defining the SearchResults component, which receives data, input, and setInput as props
const SearchResults = ({ data, input, setInput }) => {
  return (
    // Wrapping the content in a View component with padding of 10 units
    <View style={{ padding: 10 }}>
      {/* Using FlatList to efficiently render the list of search results */}
      <FlatList
        // The data prop of FlatList receives the data array to be rendered
        data={data}
        // The renderItem prop defines how each item in the list should be rendered
        renderItem={({ item }) => {
          // Checking if the employeeName includes the input text (case-insensitive)
          if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
            return (
              // Each matching item is rendered inside a View component
              <View
                style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}
              >
                {/* Creating a View for the initial letter of the employeeName */}
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
                  {/* Displaying the first letter of the employeeName in the initial letter View */}
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {item?.employeeName?.charAt(0)}
                  </Text>
                </View>

                {/* Creating a View for the employee details */}
                <View>
                  {/* Displaying the full employeeName */}
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item?.employeeName}
                  </Text>
                  {/* Displaying the designation and employeeId */}
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

// Exporting the SearchResults component as the default export
export default SearchResults;

// Defining a StyleSheet for the component (currently empty but can be used for future styles)
const styles = StyleSheet.create({});


// This `SearchResults` component displays a list of employees that match the input search term. It uses a `FlatList` to render the list efficiently and conditionally renders each item based on whether the employee's name includes the search term. 