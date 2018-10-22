-- Remove this Database it is has already existed
DROP DATABASE IF EXISTS bamazon_db;

-- Create a Database called bamazon 
CREATE DATABASE bamazon_db;


-- Use this new database 
USE bamazon_db;

-- Create Table 'products' with following properties

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

-- Insert 10 products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Disney T-Shirt","clothing",8.99,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winter-Frozen Jacket","clothing",7.99,30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana","food",0.99,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("magic-color socks","clothing",4.00,20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Big Box Baby Spinach","food",3.99,20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 55inch TV","electronic",300.99,3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("3.0 USB","electronic",20.99,1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fitbit","electronic",88.99,1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SALES Acer Laptop","electronic",120.55,5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Headphone","electronic",99.99,2);

-- Test Code to see the table in MySQL workbench 
-- Select * From products 
