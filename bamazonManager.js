require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    showMenu();

});

function showMenu() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([{
                type: "list",
                name: "managerMenu",
                message: "Hi Manager, What do you want to check in Bamazona store?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }])
            .then(function (answer) {

                switch (answer.managerMenu) {
                    case "View Products for Sale":
                        console.log(results);

                        var table = new Table({
                            head: ["Product ID", "Product Name", "Department Name", "Price", "Stock Quantity"]
                        });

                        for (i = 0; i < results.length; i++) {

                            table.push(
                                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
                            );

                        }
                        console.log(table.toString());

                        continueOrNot();
                        break;

                    case "View Low Inventory":

                        var table = new Table({
                            head: ["Product ID", "Product Name", "Department Name", "Price", "Stock Quantity"]
                        });

                        var chosenItem;
                        for (i = 0; i < results.length; i++) {
                            if (results[i].stock_quantity <= 5) {
                                chosenItem = results[i];
                                table.push(
                                    [chosenItem.item_id, chosenItem.product_name, chosenItem.department_name, chosenItem.price, chosenItem.stock_quantity]
                                );
                            }
                        }
                        console.log(table.toString());
                        continueOrNot();
                        break;

                    case "Add to Inventory":

                        inquirer
                            .prompt([{
                                    name: "product_id",
                                    type: "input",
                                    message: "Enter the Item ID: "
                                },
                                {
                                    name: "quantity",
                                    type: "input",
                                    message: "Enter the New Stock Quantity: "
                                }
                            ])
                            .then(function (answer) {
                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [{
                                            stock_quantity: answer.quantity
                                        },
                                        {
                                            item_id: answer.product_id
                                        }
                                    ],
                                    function (error) {
                                        if (error) throw err;
                                        console.log("Successfully Added More Inventory as Item ID " + answer.product_id);
                                        continueOrNot();
                                    }
                                );
                            });


                        break;

                    case "Add New Product":

                        inquirer
                            .prompt([{
                                    name: "product_name",
                                    type: "input",
                                    message: "What is the new product name?"
                                },
                                {
                                    name: "department_name",
                                    type: "input",
                                    message: "Which department is the new product in?"
                                },
                                {
                                    name: "price",
                                    type: "input",
                                    message: "Which is the price for this new product?"
                                },
                                {
                                    name: "stock_quantity",
                                    type: "input",
                                    message: "What is the stock quantity for this new product?"
                                }
                            ])
                            .then(function (answer) {
                                connection.query(
                                    "INSERT INTO products SET ?", {
                                        product_name: answer.product_name,
                                        department_name: answer.department_name,
                                        price: answer.price,
                                        stock_quantity: answer.stock_quantity
                                    },
                                    function (err) {
                                        if (err) throw err;
                                        console.log("Your new product was created successfully!");
                                        continueOrNot();
                                    }
                                );
                            });


                        break;

                }

            });
    });

}

function continueOrNot() {

    inquirer
        .prompt([{
            name: "confirm",
            type: "confirm",
            message: "Do you want to check/update anything else?"
        }])
        .then(function (answer) {

            //console.log(answer.confirm); this will return true or false
            if (answer.confirm) {
                showMenu();
            } else {
                console.log("See you later, Manager!");
                connection.end();
            }
        });
}