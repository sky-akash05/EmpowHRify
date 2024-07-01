const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors()); // Enable CORS for cross-origin requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

mongoose
  .connect("mongodb+srv://akash:akash@cluster0.vokgkfc.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const Employee = require("./models/employee"); // Import Employee model
const Attendance = require("./models/attendance"); // Import Attendance model

// Endpoint to register an employee
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    // Create a new Employee instance
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save(); // Save the new employee to MongoDB

    res
      .status(201)
      .json({ message: "Employee saved successfully", employee: newEmployee }); // Respond with success message and saved employee object
  } catch (error) {
    console.log("Error creating employee", error);
    res.status(500).json({ message: "Failed to add an employee" }); // Handle server error
  }
});

// Endpoint to fetch all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find(); // Retrieve all employees from MongoDB
    res.status(200).json(employees); // Respond with array of employees
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the employees" }); // Handle server error
  }
});

// Endpoint to record attendance
app.post("/attendance", async (req, res) => {
  try {
    const { employeeId, employeeName, date, status } = req.body;

    const existingAttendance = await Attendance.findOne({ employeeId, date });

    if (existingAttendance) {
      // Update existing attendance record if it exists
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance); // Respond with updated attendance record
    } else {
      // Create new attendance record if it doesn't exist
      const newAttendance = new Attendance({
        employeeId,
        employeeName,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance); // Respond with newly created attendance record
    }
  } catch (error) {
    res.status(500).json({ message: "Error submitting attendance" }); // Handle server error
  }
});

// Endpoint to fetch attendance records for a specific date
app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;

    // Find attendance records for the specified date
    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData); // Respond with array of attendance records
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data" }); // Handle server error
  }
});

// Endpoint to generate attendance report for all employees in a specific month and year
app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;

    // Calculate start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate attendance data for all employees within the date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.month), // Filter by month from query parameter
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year), // Filter by year from query parameter
                ],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$employeeId", // Group by employeeId
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 }, // Count 'present' statuses
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 }, // Count 'absent' statuses
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 }, // Count 'halfday' statuses
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 }, // Count 'holiday' statuses
            },
          },
        },
      },
      {
        $lookup: {
          from: "employees", // Lookup employee details from 'employees' collection
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails", // Unwind the employeeDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          name: "$employeeDetails.employeeName", // Project employeeName from employeeDetails
          designation: "$employeeDetails.designation", // Project designation from employeeDetails
          salary: "$employeeDetails.salary", // Project salary from employeeDetails
          employeeId: "$employeeDetails.employeeId", // Project employeeId from employeeDetails
        },
      },
    ]);

    res.status(200).json({ report }); // Respond with attendance report
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Error generating the report" }); // Handle server error
  }
});
/* Explanation of Inline Comments:
Setup and Dependencies:

Comments explain the purpose of importing necessary modules (express, body-parser, mongoose, moment, cors) and setting up the Express application.
Connecting to MongoDB:

Comments explain connecting to MongoDB using mongoose.connect() and handling connection success and failure.
Employee Management Endpoints (/addEmployee, /employees):

Comments explain the purpose of each endpoint, how data is handled (req.body), and responses (res.status().json()).
Attendance Endpoints (/attendance, /attendance-report-all-employees):

Comments explain the logic of recording attendance, fetching attendance records, and generating attendance reports.
Includes explanations of MongoDB queries ($match, $group, $lookup, $project) used in the aggregation pipeline.
Error Handling:

Comments indicate where errors might occur (try block) and how they are handled (catch block) using appropriate HTTP status codes (500 for server errors).
These inline comments should help clarify each section of your API implementation, making it easier to understand and maintain the codebase. Adjustments can be made based on specific business logic or additional requirements.*/

/**************************************************************** */




///////////*****************************************pckage.json///////////////////////////////////////
// ### Explanation and Suggestions:
// 1. **Name, Version, Description**:
//    - `name`: Specifies the name of your package (`api`).
//    - `version`: Indicates the current version of your package (`1.0.0`).
//    - `description`: Provides a brief description of your package (`backend`).

// 2. **Main File**:
//    - `main`: Specifies the entry point for your application (`index.js`). This is where Node.js will start executing your code.

// 3. **Scripts**:
//    - `start`: Uses `nodemon` to run `index.js`, allowing automatic restarts when files change during development.
//    - `test`: Placeholder script that currently echoes an error message. You can replace this with actual test scripts if needed (`mocha`, `jest`, etc.).

// 4. **Author and License**:
//    - `author`: Optional field to specify the author(s) of the package.
//    - `license`: Specifies the license under which the package is distributed (`ISC` in this case).

// 5. **Dependencies**:
//    - Lists all dependencies required for your project to run (`body-parser`, `cors`, `express`, `mongoose`, `nodemon`).
//    - Versions are specified with caret `^` to allow compatible updates to minor versions automatically (`^1.20.2` means any version from `1.20.2` to `<2.0.0`).

// ### Suggestions:
// - **Environment Variables**: Consider adding environment variable configuration (`dotenv`) for sensitive data like database credentials.
// - **Production Ready**: Ensure your application is configured for production environments with appropriate security and performance considerations.
// - **Error Handling**: Implement robust error handling and logging to effectively monitor and troubleshoot issues.
// - **Documentation**: Document your API endpoints, especially for complex operations like attendance reporting, to aid future maintenance and usage.

// This setup should serve as a solid foundation for developing and deploying your Node.js API project. Adjustments can be made based on specific project requirements and best practices.


