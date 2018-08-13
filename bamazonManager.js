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
    manag(); 
})

function manag(){
    inquirer.prompt([
        {
            type: "list",
            name: "pick",
            message: "Menu Option: ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(ans) {
        madeChoice(ans.pick);
    })
}

function madeChoice(cho){
    if(cho === "View Products for Sale"){
        read(1);
    }else if(cho === "View Low Inventory"){
        lowInv();
    }else if(cho === "Add to Inventory"){
        read(2);
    }else if(cho === "Add New Product"){
        addItem();
    }
}

function read(dec){
    console.log("Read data")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for(i in res){
            console.log(`ID: ${res[i].item_id}  Product Name: ${res[i].product_name}   Price: ${res[i].price} Quanatity: ${res[i].stock_quantity}`);
        }
        if(dec === 1){
            manag();
        }else if(dec === 2){
            addInv(res);
        }
    });
}

function lowInv(){
    console.log("Low Inventory, Below 5 Quantity")
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for(i in res){
            console.log(`ID: ${res[i].item_id}  Product Name: ${res[i].product_name}   Price: ${res[i].price} Quanatity: ${res[i].stock_quantity}`);
        }
        manag();
    });
}

function addInv(data){
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the item would you like to add more inventory too?"
        },
        {
            type: "input",
            name: "amount",
            message: "How many would you like to add?"
        }
    ]).then(function(ans) {
        console.log("ADD INVENTORY")
        var newStock = parseInt(data[ans.id - 1].stock_quantity) + parseInt(ans.amount);
        var sql = `UPDATE products SET stock_quantity = ${newStock} WHERE item_id = ${ans.id}`
        connection.query(sql, function (err, res) {
            if (err) throw err;
            read(1)
        });
    })
}

function addItem(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the item?"
        },
        {
            type: "list",
            name: "depart",
            message: "What department does this item fall under?",
            choices: ["furniture", "accessory", "clothing", "electronic", "cards", "toys"]
        },
        {
            type: "input",
            name: "price",
            message: "What is the price of the item"
        },
        {
            type: "input",
            name: "stock",
            message: "what is the quantity"
        }
    ]).then(function(ans) {
        console.log("Insert New Item");
        var sql = `INSERT INTO products(product_name, department_name, price, stock_quantity) 
        VALUES (\"${ans.name}\", \"${ans.depart}\", ${ans.price}, ${ans.stock})`

        connection.query(sql, function (err, res) {
            if (err) throw err;
            read(1);
        });
    })
}