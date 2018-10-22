//Git: npm init 
//Git: npm install mysql// npm install inquirer


//require npm 
// var mysql = require("mysql");
// var inquirer = require("inquirer");

//mysql.createConnection
var connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
    //start writing code here...
    
    //showAllProducts();

    // End connection (place this somewhere inside the askQuestion() function)
    //connection.end();

});

function showAllProducts() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        //show all products in a table format 
        //console.log (results);

        askQuestions();

    });

}

function askQuestions() {

        //inquirer prompt users two messages 

        inquirer
      .prompt([
        {
            // 1. 
            //ask for ID of the product they would like to buy
        
        },
        {
            //2.
            //ask units of the product they would like to buy
        }
      ])
      .then(function(answer) {

        //See sample code below

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
    .prompt([
      {
          //ask whether the user want to keep shopping other products
      }
    ])
    .then(function(answer) {

      //if yes,
      //run showAllProducts() function
      //else,
      //console.log("Thank you for shopping at Bamazona!");
      //connection.end();

  });


}


