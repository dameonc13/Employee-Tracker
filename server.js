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
  
  var query = "SELECT employee_id ,first_name, last_name, title, salary, department_name  FROM employee INNER JOIN employee_role on  employee.role_id = employee_role.id INNER JOIN department  on employee_role.department_id = department.id  ORDER BY employee_id ";
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


function viewAllRole() {
  
  var query = "SELECT *  FROM employee_role INNER JOIN department on employee_role.department_id = department.id";
  connection.query(query, function (err, res) {

    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      data.push({
        id: res[i].id,
        title: res[i].title,
        salary: res[i].salary,
        department_id: res[i].title,
        
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







function addEmployee(){
  const query = " SELECT first_name , last_name , role_id, manager_id, title from employee INNER JOIN  employee_role on employee.role_id = employee_role.id  " ;
  connection.query(query, function(err, results) {
    if (err) throw err;
    inquirer
    .prompt([
    {
        name: "firstName",
        type: "input",
        message: "Please enter the First Name of the employee..",
       
    },
    {
        name: "lastName",
        type: "input",
        message: "Please enter the Last Name of the employee..",
       
    },
    {
      name: "role",
      type: "rawlist",
      choices: function() {
          var choiceArray = [];
            for (var i = 4; i < results.length; i++) {
                choiceArray.push(results[i].title);
            }
          var choice_roles = [...new Set(choiceArray)];
          return choice_roles;
         
          
          },
      message: "Please select the Role assigned.."
  },
    {
      name: "manager",
      type: "rawlist",
      
      
      choices: function() {
        var choice = ["None"];
          for (var i = 0; i < results.length; i++) {
              if (results[i].title !== null && results[i].title.startsWith("Chief ") )
              choice.push(results[i].first_name + " " + results[i].last_name + " " + results[i].title);
          }
        var Manager = [...new Set(choice)];
        return Manager;
        },
    message: "Please select the Manager to assign.."

  }
    ])
    .then(function(answer){
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].title === answer.manager) 
                chosenItem = results[i];
                
                
        }
      connection.query("SELECT id from employee_role where title = ?",[answer.role],
        function(error,res){
            if (error) throw error;
            connection.query(
            "INSERT INTO Employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id:res[0].id,
              manager_id:chosenItem?chosenItem.id:null
            },
              function(err){
                if (err) throw err;
                console.log(`Employee ${answer.firstName}, ${answer.lastName} is added successfully`);
                viewAllEmployees();
                runSearch();
               
              }    
            );    
      });
    });
  });
}

/*function addDept(){
    inquirer
        .prompt([
        {
            name: "deptName",
            type: "input",
            message: "Please enter the Name of the Department..",
            validate: validateString,
            filter: toUpper
        }
        ])
        .then(function(answer){
            connection.query(
            "INSERT INTO Department SET ?", {name: answer.deptName},
                function (err){
                  if(err) throw err;
                  console.log(`Department ${answer.deptName} added successfully!`);
                  view("Department");
                }
            )
        });
}*/




/*
function updateEmpMgr(){
    const query = `Select e.id empId, CONCAT(e.first_name, " ", e.last_name) as EmpName, r.title, concat(m.first_name, " ", m.last_name) as Manager, e.manager_id
                    FROM employee e 
                    JOIN role r ON e.role_id = r.id
                    LEFT JOIN employee m ON m.id = e.manager_id`;
    connection.query(query, function(err, results) {
        if (err) throw err;
        inquirer
        .prompt([
        {
            name: "empName",
            type: "rawlist",
            choices: function (){
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    if (!(results[i].title).startsWith("Manager"))
                    choiceArray.push(results[i].EmpName);
                }
                return choiceArray;
            },
            message: "Please select the Employee whose Manager needs to be updated.."
        },
        {
            name: "mgrName",
            type: "rawlist",
            choices: function (){
                var choice = ["None"];
                for (var i = 0; i < results.length; i++) {
                    if((results[i].title).startsWith("Manager"))
                    choice.push(results[i].EmpName);
                }
                return choice;
            },
            message: "Please select the new Manager to be assigned.."
        }
        ])
        .then(function(answer){
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].EmpName === answer.mgrName) 
                    chosenItem = results[i];
            }
            const query = `UPDATE Employee 
                           SET manager_id = ?
                           WHERE first_name= ? AND last_name= ?`;
            connection.query(query, [ chosenItem?chosenItem.empId:null, answer.empName.split(" ")[0], answer.empName.split(" ").splice(1).join(" ")],
                function(error){
                if (error) throw error;
                    console.log(`Updated ${answer.empName}'s Manager to ${chosenItem?chosenItem.EmpName:null} successfully`);
                    viewAll();
                }    
            );    
            });
        });

} */


/*
function deleteRole(){
  connection.query("SELECT * FROM Role",function(err, results){
    inquirer
      .prompt([
      {
          name: "role",
          type: "rawlist",
          choices: function (){
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].title);
              }
              return choiceArray;
          },
          message: "Please select the Role to be deleted.."
      }
    ])
    .then(function(answer){
        const query = "DELETE FROM Role Where title = ?";
        connection.query(query,[answer.role],
            function(err){
              if (err) throw err;
              console.log(`Deleted ${answer.role} Successfully`);
              view("Role");
        });
    });  
  });
}

function deleteDept(){
  connection.query("SELECT * FROM Department",function(err, results){
    inquirer
      .prompt([
      {
          name: "dept",
          type: "rawlist",
          choices: function (){
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].name);
              }
              return choiceArray;
          },
          message: "Please select the Department to be deleted.."
      }
    ])
    .then(function(answer){
        const query = "DELETE FROM Department Where name = ?";
        connection.query(query,[answer.dept], function(err){
              if (err) throw err;
              console.log(`Deleted ${answer.dept} Successfully`);
              view("Department");
        });
    });  
  });
}
*/