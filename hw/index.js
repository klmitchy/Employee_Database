// const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
// const queryFunctions = require('./queryFunctions')
const { allDepts } = require('./queryFunctions')
// Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         // MySQL username,
//         user: 'root',
//         password: 'root',
//         database: 'emp_tracker_db'
//     },
//     console.log(`Connected to the database.`)
// );
const opt = ["ALL_DEPT", "ALL_ROLES"];
function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "userview",
            message: "What you want to see?",
            choices: opt
        }
    ])
        .then((ans) => {
            console.log(ans);
            switch (ans.userview) {
                case opt[0]:
                    // queryFunctions.allDepts();
                    allDepts();
                    break;

                default:
                    break;
            }
        })
}

startApp();

// function allDepts() {
//     db.query('SELECT * FROM department', function (err, results) {
//         console.log(results);
//         startApp();
//     });
// }


//
const inquirer = require("inquirer");
const db = require("./db/dbQueries");

const init = () => {
  console.log("Welcome to the Employee Tracker!");
  menu();

};

menu = () => {
  console.log("\n");
  
  inquirer
    .prompt(menuQs)
    .then((answers) => {
      if (answers.menu == "View All Departments") {
        viewDepartments();
      } else if (answers.menu == "View All Roles") {
        viewRoles();
        menu();
      } else if (answers.menu == "View All Employees") {
        viewEmployees();
      } else if (answers.menu == "Add a Department") {
        inquirer
          .prompt({
            type: "input",
            message:
              "What is the name of the department you would like to add?",
            name: "dept"
          })
          .then((answer) => {
            addDepartment(answer.dept);
          });
      } else if (answers.menu == "Add a Role") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the role you would like to add?",
              name: "role"
            },
            {
              type: "input",
              message: "What is the salary for this role?",
              name: "salary"
            },
            {
              type: "input",
              message:
                "What is the department id of the role you would like to add?",
              name: "dept",
              default: "1001"
            }
          ])
          .then((answer) => {
            let roleInfo = [answer.role, answer.salary, answer.dept];
            addRole(roleInfo);
          });
      } else if (answers.menu == "Add an Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "What is the first name of the employee you would like to add?",
              name: "firstName"
            },
            {
              type: "input",
              message:
                "What is the last name of the employee you would like to add?",
              name: "lastName"
            },
            {
              type: "input",
              message: "What is the employee's role id?",
              name: "role"
            },
            {
              type: "input",
              message: "What is the employee's manager's id?",
              name: "manager"
            }
          ])
          .then((answer) => {
            let employeeInfo = [
              answer.firstName,
              answer.lastName,
              answer.role,
              answer.manager
            ];
            addEmployee(employeeInfo);
          });
      } else if (answers.menu == "Update Employee Role") {
        updateEmployee();
      } else if (answers.menu == "Delete an Employee") {
        deleteEmp();
      } else if (answers.menu == "Delete a Department") {
        deleteDept();
      } else if (answers.menu == "Delete a Role") {
        deleteRole();
      } else {
        process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// menu prompt questions for inquirer
const menuQs = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do next?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update Employee Role",
      "Delete an Employee",
      "Delete a Department",
      "Delete a Role",
      "Exit"
    ]
  }
];

// starts the program
init();
// call the db's function to return all employee related data
async function viewEmployees() {
  let employees = await db.findAllEmployees();
  console.log("\n");
  console.table(employees);
  menu();
}
// call the db's function to return all department data
async function viewDepartments() {
  let departments = await db.findAllDepartments();
  console.log("\n");
  console.table(departments);
  menu();
}
// call the db's function to return all role related data
async function viewRoles() {
  let roles = await db.findAllRoles();
  console.log("\n");
  console.table(roles);
  menu();
}
// call the db's function to add new department, passing in the data from the user
async function addDepartment(newDept) {
  await db.addNewDepartment(newDept);
}
// call the db's function to add new role, passing in the data from the user
async function addRole(newRole, salary, deptId) {
  await db.addNewRole(newRole, salary, deptId);
}
// call the db's function to add new employee, passing in the data from the user
async function addEmployee(employeeInfo) {
  await db.addNewEmployee(employeeInfo);
}
// call the db's function to add update employee info
async function updateEmployee() {
  let employeeArr = await createEmployeeList();
  // ask the user which employee to update from the list
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "employee",
        choices: employeeArr
      },
      {
        type: "input",
        message: "What is their new role id?",
        name: "role"
      }
    ])
    //take the answer and split it into [first, last] so i can use the value to compare against db for update
    