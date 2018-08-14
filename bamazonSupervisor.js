var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    superVis(); 
})

function superVis(){
    inquirer.prompt([
        {
            type: "list",
            name: "pick",
            message: "Menu Option: ",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(ans) {
        madeDec(ans.pick);
    })
}

function madeDec(pick){
    if(pick === "View Product Sales by Department"){
        viewTab();
    }else if(pick === "Create New Department"){
        newDep();
    }
}

function viewTab(){
    connection.query("SELECT department_name, sum(product_sales) as sale FROM products GROUP BY department_name;", function (err, res) {
        if (err) throw err;
        var row = {};
        for(i in res){
            var key = res[i].department_name;
            row[key] = res[i].sale
        }
        joinTab(row);
    });
}

function joinTab(tab){
    console.log(tab);
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        var conTab = [];
        for(i in res){
            var profit = tab[res[i].department_name] - res[i].over_head_costs;
            var def = {"department ID": res[i].department_id, "department name": res[i].department_name, "over head cost": res[i].over_head_costs, "product sales": tab[res[i].department_name], "total profit": profit};
            conTab.push(def);
        }
        console.table(conTab);
        superVis();
    });
}

function newDep(){
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the name of the department"
        },
        {
            type: "input",
            name: "amount",
            message: "what is the over head cost?"
        }
    ]).then(function(ans) {
        inputDep(ans.id, ans.amount);
    })

}

function inputDep(name, amo){
    var sql = `INSERT INTO departments(department_name, over_head_costs) VALUES(\"${name}\", ${amo})`
    connection.query(sql, function (err, res) {
        console.log(`name have been Insert`);
        superVis();
    });
}
