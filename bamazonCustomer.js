var mysql = require("mysql");
var inquirer = require("inquirer");

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
    read();       
});

function read(){
    console.log("read data")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for(i in res){
            console.log(`ID: ${res[i].item_id}  Product Name: ${res[i].product_name}   Price: ${res[i].price}`);
        }
        challenge_one();
    });
}

function challenge_one(){
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Which ID of the product would like to buy?"
        },
        {
            type: "input",
            name: "units",
            message: "how many units would you like to buy?"
        }
    ]).then(function(answer) {
        quantCheck(answer.id, answer.units)
    })
}

function quantCheck(id, num){
    connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
        if (err) throw err;
        if(res[0].stock_quantity < num){
            console.log("Insufficient quantity!");
        }else{
            var newStock = res[0].stock_quantity - num; 
            updateQuant(id, newStock);
            var total = num * res[0].price;
            console.log("Cost: " + total);
        }
        challenge_one();
    });
}

function updateQuant(id, num){
    var sql = `UPDATE products SET stock_quantity = ${num} WHERE item_id = ${id}`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
    });
}