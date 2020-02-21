var mysql = require("mysql");
var inquirer = require("inquirer");

const user = require('./user.js');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: `${user.getName()}`,

  // Your password
  password: `${user.getPassword()}`,
  database: "Employee_Tracker"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "See all employees by department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "View All Role",
        "Add Role",
        "exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Employees":
          artistSearch();
          break;

        case "See all employees by department":
          multiSearch();
          break;

        case "Add Employee":
          rangeSearch();
          break;

        case "Remove Employee":
          songSearch();
          break;

        case "Update Employee Role":
          songSearch();
          break;

        case "View All Role":
          songSearch();
          break;

        case "Add Role":
          songSearch();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}