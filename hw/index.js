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
          