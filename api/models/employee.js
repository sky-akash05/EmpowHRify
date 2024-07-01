const mongoose = require("mongoose");

// Define the Mongoose schema for Employee
const employeeSchema = new mongoose.Schema({
  // Employee ID field, type string, required and unique
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  // Employee name field, type string, required
  employeeName: {
    type: String,
    require: true,
  },
  // Designation field, type string, required
  designation: {
    type: String,
    required: true,
  },
  // Joining date field, type string, required
  joiningDate: {
    type: String,
    required: true,
  },
  // Date of birth field, type string, required
  dateOfBirth: {
    type: String,
    required: true,
  },
  // Salary field, type number, required
  salary: {
    type: Number,
    required: true,
  },
  // Active employee status field, type boolean, required
  activeEmployee: {
    type: Boolean,
    required: true,
  },
  // Phone number field, type string, required
  phoneNumber: {
    type: String,
    required: true,
  },
  // Address field, type string, required
  address: {
    type: String,
    required: true,
  },
  // Created at field, type Date, default value is current date/time
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model based on the employeeSchema
const Employee = mongoose.model("Employee", employeeSchema);

// Export the Employee model for use in other parts of the application
module.exports = Employee;

/*Explanation of Inline Comments:
Import Mongoose:

const mongoose = require('mongoose');: Imports the Mongoose library for MongoDB object modeling.
Define Schema:

const employeeSchema = new mongoose.Schema({ ... });: Creates a new Mongoose schema named employeeSchema to define the structure of the Employee collection in MongoDB.
Schema Fields:

employeeId:

type: String: Specifies that the employeeId field will store strings.
required: true: Ensures that this field is mandatory for each document in the collection.
unique: true: Ensures that each employeeId is unique across documents in the collection.
employeeName:

type: String: Specifies that the employeeName field will store strings.
required: true: Ensures that this field is mandatory for each document in the collection.
designation:

type: String: Specifies that the designation field will store strings.
required: true: Ensures that this field is mandatory for each document in the collection.
joiningDate:

type: String: Specifies that the joiningDate field will store strings.
required: true: Ensures that this field is mandatory for each document in the collection.
dateOfBirth:

type: String: Specifies that the dateOfBirth field will store strings.
required: true: Ensures that this field is mandatory for each document in the collection.
salary:

type: Number: Specifies that the salary field will store numbers.
required: true: Ensures that this field is mandatory for each document in the collection.
activeEmployee:

type: Boolean: Specifies that the activeEmployee field will store boolean values.
required: true: Ensures that this field is mandatory for each document in the collection.
phoneNumber:

type: String: Specifies that the phoneNumber field will store strings.
required: true: Ensures that this field is mandatory for each document in the collection.
address:

type: String: Specifies that the address field will store strings.
required: true: Ensures that this field is mandatory for each document in the collection.
createdAt:

type: Date: Specifies that the createdAt field will store date values.
default: Date.now: Sets the default value of createdAt to the current date and time when a new document is created.
Create Mongoose Model:

const Employee = mongoose.model("Employee",employeeSchema);: Defines a Mongoose model named Employee based on the employeeSchema.
This model represents the structure of documents that can be stored in the Employee collection of your MongoDB database.
Export Model:

module.exports = Employee;: Makes the Employee model available for use in other files. When imported elsewhere (require("./employeeSchema")), it provides access to the schema and operations defined on it.
Purpose of Comments:
Clarity: Helps developers understand each field and its configuration within the schema.
Documentation: Serves as documentation within the codebase, aiding future maintenance and updates.
Readability: Improves readability by providing context for each part of the schema definition.
These comments ensure that anyone reading the code can quickly grasp the purpose and requirements of the Employee schema, facilitating easier development and collaboration. Adjust the comments as needed based on your specific project's conventions and requirements. */
