require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");

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

    //start writing code here...

    startShopping();

    // End connection (place this somewhere inside the askQuestion() function)
    //connection.end();

});

function startShopping() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);

        //inquirer prompt users two messages 
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

                var chosenItem;
                for (i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.product_id)) {
                        chosenItem = results[i];
                    }

                }

                console.log(chosenItem);

                if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {

                    var new_stock_quantity = chosenItem.stock_quantity - parseInt(answer.quantity);

                    console.log(new_stock_quantity);

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
                            console.log("successfully purchased the item!")
                        }
                    );

                } else {
                    console.log("insufficient quantity! sorry!")
                }

            });
    });
}

// Sample code:
//if (answer.ID !== "" and answer.units !== "") {

//for loop -- to go through the list
//if (result.units > answer.unit) {
//     connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [
//         {
//           stock_quantity: answer.units
//         },
//         {
//           id: chosenItem.id
//         }
//       ],
//       function(error) {
//         if (error) throw err;
//         console.log("successfully purchased!");
//         continueOrNot(); --> to keep shopping 
//       }
//     );
//   }
//   else {
//     console.log("insufficient quantity");
//     continueOrNot(); --> to keep shopping 
//   }


//}


//}


function continueOrNot() {

    inquirer
        .prompt([{
            //ask whether the user want to keep shopping other products
        }])
        .then(function (answer) {

            //if yes,
            //run showAllProducts() function
            //else,
            //console.log("Thank you for shopping at Bamazona!");
            //connection.end();

        });


}