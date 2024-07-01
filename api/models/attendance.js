
const mongoose = require("mongoose");

// Define the Mongoose schema for Attendance
const attendanceSchema = new mongoose.Schema({
  // Employee ID field, type string, required
  employeeId: {
    type: String,
    required: true,
  },
  // Employee name field, type string, required
  employeeName: {
    type: String,
    required: true,
  },
  // Date field, type string, required
  date: {
    type: String,
    required: true,
  },
  // Status field, type string, required
  status: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model based on the attendanceSchema
const Attendance = mongoose.model("Attendance", attendanceSchema);

// Export the Attendance model for use in other parts of the application
module.exports = Attendance;


// ### Explanation of Inline Comments:
// 1. **Import Mongoose**:
//    - `const mongoose = require("mongoose");`: Imports the Mongoose library for MongoDB object modeling.

// 2. **Define Schema**:
//    - `const attendanceSchema = new mongoose.Schema({ ... });`: Creates a new Mongoose schema named `attendanceSchema` to define the structure of the `Attendance` collection in MongoDB.

// 3. **Schema Fields**:
//    - **employeeId**: 
//      - `type: String`: Specifies that the `employeeId` field will store strings.
//      - `required: true`: Ensures that this field is mandatory for each document in the collection.

//    - **employeeName**: 
//      - `type: String`: Specifies that the `employeeName` field will store strings.
//      - `required: true`: Ensures that this field is mandatory for each document in the collection.

//    - **date**: 
//      - `type: String`: Specifies that the `date` field will store strings.
//      - `required: true`: Ensures that this field is mandatory for each document in the collection.

//    - **status**: 
//      - `type: String`: Specifies that the `status` field will store strings.
//      - `required: true`: Ensures that this field is mandatory for each document in the collection.

// 4. **Create Mongoose Model**:
//    - `const Attendance = mongoose.model("Attendance", attendanceSchema);`: Defines a Mongoose model named `Attendance` based on the `attendanceSchema`.
//    - This model represents the structure of documents that can be stored in the `Attendance` collection of your MongoDB database.

// 5. **Export Model**:
//    - `module.exports = Attendance;`: Makes the `Attendance` model available for use in other files. When imported elsewhere (`require("./attendanceSchema")`), it provides access to the schema and operations defined on it.

// ### Purpose of Comments:
// - **Clarity**: Helps developers understand each field and its configuration within the schema.
// - **Documentation**: Serves as documentation within the codebase, aiding future maintenance and updates.
// - **Readability**: Improves readability by providing context for each part of the schema definition.

// These comments ensure that anyone reading the code can quickly grasp the purpose and requirements of the `Attendance` schema, facilitating easier development and collaboration. Adjust the comments as needed based on your specific project's conventions and requirements.