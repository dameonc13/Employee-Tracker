const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
//const  start = require("npm-start-command")

const user = require('./user.js');
var data = []


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
      message: "\n \n What would you like to do?",
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
          viewAllEmployees();
          break;

        case "See all employees by department":
          viewAllByDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          rmvEmployee();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "View All Role":
          viewAllRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function viewAllEmployees() {
  var query = "SELECT employee_id ,first_name, last_name, title, salary, department_name  FROM employee INNER JOIN employee_role on  employee.role_id = employee_role.id INNER JOIN department  on employee_role.department_id = department.id ORDER BY employee_id ";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      data.push({
        id: res[i].employee_id,
        first_name: res[i].first_name,
        last_name: res[i].last_name,
        title: res[i].title,
        salary: res[i].salary,
        department: res[i].department_name
      });
    }
    console.table(data);
    data = []
    runSearch();
  });

}






function viewAllByDepartment() {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "list",
        choices: [
          "Accounting",
          "Information Technology",
          "Marketing",
          "Sales",
          "exit"],
          message: "Select Department: ",
      
      },
    ])
    .then(function(answer) {
      switch (answer.action) {case "exit":
      connection.end();
      break;
  }
      var query = "SELECT employee_id ,first_name, last_name, title, salary, department_name FROM employee INNER JOIN employee_role on  employee.role_id = employee_role.id INNER JOIN department  on employee_role.department_id = department.id WHERE ?"; 
      connection.query(query,  { department_name: answer.department_name }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          data.push({
            id: res[i].employee_id,
            first_name: res[i].first_name,
            last_name: res[i].last_name,
            title: res[i].title,
            salary: res[i].salary,
            department: res[i].department_name
          });
        }
        console.table(data);
        data = []
        runSearch();
      });
    });
}



function addEmployee() {
  inquirer
    .prompt({
      name: "so",
      type: "input",
      message: "Enter Employee First Name"
    })
    inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "Enter Employee Last Name"
    })
    .prompt({
      name: "song",
      type: "input",
      message: "Enter Employee Last Name"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        if (err) throw err;
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

