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

    startShopping();

});

function startShopping() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        
        //show all products 
        var table = new Table({
            head: ["Product ID", "Product Name", "Department Name", "Price", "Stock Quantity"]
        });

        for (i = 0; i < results.length; i++) {

            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
            );

        }
        console.log(table.toString());

        inquirer
            .prompt([{
                    name: "product_id",
                    type: "input",
                    message: "What is the product you want to buy?(Enter the ID Number)"

                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units do you want to buy for this chosen product?"
                }
            ])
            .then(function (answer) {

                var table = new Table({
                    head: ["Product ID", "Product Name", "Price", "Purchase Quantity"]
                });


                var chosenItem;
                for (i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.product_id)) {
                        chosenItem = results[i];

                    }

                }

                table.push(
                    [chosenItem.item_id, chosenItem.product_name, chosenItem.price, answer.quantity]
                );
                console.log(table.toString());


                if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {

                    var new_stock_quantity = chosenItem.stock_quantity - parseInt(answer.quantity);

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: new_stock_quantity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("successfully purchased the item!");
                            console.log("You have purchased " + answer.quantity + " " + chosenItem.product_name + ".");
                            continueOrNot();
                        }
                    );

                } else {
                    console.log("Sorry! Insufficient quantity on this product!");
                    console.log("We currently have: " + chosenItem.stock_quantity + " unit(s) left in our store!");
                    continueOrNot();
                }

            });
    });
}

function continueOrNot() {

    inquirer
        .prompt([{
            name: "confirm",
            type: "confirm",
            message: "Do you want to continue shopping for other products?"
        }])
        .then(function (answer) {

            //console.log(answer.confirm); this will return true or false
            if (answer.confirm) {
                startShopping();
            } else {
                console.log("Thank you for shopping at Bamazona!");
                connection.end();
            }
        });
}