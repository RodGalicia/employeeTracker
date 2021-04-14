const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
host: 'localhost',

  // Your port; if not 3306
port: 3306,

  // Your username
user: 'root',

  // Your password
password: 'Starfox123',
database: 'employeeTracker_DB',
});

function addDepartment(){
    inquirer.prompt([

        {type:'input',
        message:'Name',
        name:'dName'},
    
    ]).then((answer) => {
        connection.query(
        'INSERT INTO department SET ?',
        {
        name: answer.dName
        },
        (err) => {
            if (err) throw err;
            console.log('Your department was created successfully!');
            
        }
        )
    })};

    function viewDepartment(){
        connection.query('SELECT * FROM department', (err, results) => {
            if (err) throw err;
            console.table(results);
        }
        )};

function addRole(){
    inquirer.prompt([

        {type:'input',
        message:'Title',
        name:'title'},
        {type:'input',
        message:'Salary',
        name:'salary'},
        {type:'input',
        message:'Department ID',
        name:'dId'},
    
    ]).then((answer) => {
        connection.query(
        'INSERT INTO role SET ?',
        {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.dId    
        },
        (err) => {
            if (err) throw err;
            console.log('Your role was created successfully!');
            
        }
        )
    })};

    function viewRoles(){
        connection.query('SELECT * FROM role', (err, results) => {
            if (err) throw err;
            console.table(results);
        }
        )};

    function updateRoles(){
        connection.query('SELECT * FROM role', (err, results) => {
            if (err) throw err;
            console.table(results);
        })
        inquirer.prompt([
            {type:'input',
            message:'ID of role you wish to update',
            name:'uRole'},
            {type:'input',
            message:'new role title',
            name:'uTitle'},
            {type:'input',
            message:'new salary',
            name:'uSalary'},
            {type:'input',
            message:'new department ID',
            name:'dId'}

        ]).then((answer) => {
            connection.query(
            'UPDATE role SET ? WHERE ?',
            [
            {
            title: answer.uTitle,
            salary: answer.uSalary,
            department_id: answer.dId,   
            },
            {
                id: answer.uRole,
            },
        ],
        (err) => {
                if (err) throw err;
                console.log('Your role was updated successfully!');
                
            }
            )
        })
        
    };

function addEmployee(){
    inquirer.prompt([

        {type:'input',
        message:'First Name',
        name:'fName'},
        {type:'input',
        message:'Last Name',
        name:'lName'},
        {type:'input',
        message:'Role ID',
        name:'rId'},
        {type:'input',
        message:'Manager ID',
        name:'mId'},
    
    ]).then((answer) => {
        connection.query(
        'INSERT INTO employee SET ?',
        {
        first_name: answer.fName,
        last_name: answer.lName,
        role_id: answer.rId,
        manager_id: answer.mId    
        },
        (err) => {
            if (err) throw err;
            console.log('employee was created successfully!');
            
        }
        )
    })};
    function viewEmployee(){
        connection.query('SELECT * FROM employee', (err, results) => {
            if (err) throw err;
            console.table(results);
        }
        )};

    function init(){
        inquirer.prompt([
            {type:'list',
        message:'What would you like to do?',
        name:'operation',
        choices:[
            "add departments",
            "add roles",
            "add employees",
            "view departments",
            "view roles",
            "view employees",
            "update employee roles"
            
        ]},
        ]).then(answer => {
        chooseOperation(answer);
        }).catch((err) => console.error(err))
        };

        function chooseOperation(oper) {

            if (oper.operation == "add departments")
                addDepartment();

            if (oper.operation == "add roles")
                addRole();

            if (oper.operation == "add employees")
                addEmployee();
            
            if (oper.operation == "view departments")
                viewDepartment();

            if (oper.operation == "view roles")
                viewRoles();
            
            if (oper.operation == "view employees")
                viewEmployee();
            
            if (oper.operation == "update employee roles")
                updateRoles();
        }
    
        
        

        

init();
