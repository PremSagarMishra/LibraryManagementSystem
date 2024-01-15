const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Create a connection to the MySQL database
const con = mysql.createConnection({
    host: "localhost",
    user: "root", // Assuming your MySQL user is 'root'
    password: "admin",
    database: "your_database_name" // Replace with your actual database name
});

// Handle the root route
app.get("/", (req, res) => {
    // Connect to the MySQL database
    con.connect(function (err) {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            res.status(500).send("Error connecting to MySQL");
            return;
        }
        console.log("Connected to MySQL!");

        // Perform any database operations here

        // Close the MySQL connection when done
        con.end(function (err) {
            if (err) {
                console.error("Error closing MySQL connection:", err);
                return;
            }
            console.log("MySQL connection closed.");
        });

        // Send a response to the client
        res.send("Connected to MySQL!");
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
