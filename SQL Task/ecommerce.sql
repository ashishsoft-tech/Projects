-- Create Database
CREATE DATABASE ecommerce;

-- Use the database
USE ecommerce;    

-- Create Customers Table
CREATE TABLE customers(
  id INT AUTO_INCREMENT PRIMARY KEY,     -- Unique Customer Id
  name VARCHAR(100) NOT NULL,            -- Customer Name
  email VARCHAR(100) UNIQUE NOT NULL,     -- Customer Email
   address VARCHAR(255)                    -- Customer Address
);

-- Create Products Table
CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique Products Id
    name VARCHAR(100) NOT NULL,                -- Product Name
    price DECIMAL(10,2) NOT NULL,              -- Product Price
    description TEXT                           -- Product Description
);

-- Create Orders Table
CREATE TABLE orders(
      id INT AUTO_INCREMENT PRIMARY KEY,                      -- Unique Order ID
      customer_id INT,                                        -- Refernece to customer
      order_date DATE,                                       -- Order Date
      total_amount DECIMAL(10,2),                            -- Total order amount
      FOREIGN KEY (customer_id) REFERENCES customers(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

-- Insert Sample Customers

INSERT INTO customers (name, email, address) VALUES
('Ashish Kumar', 'ashish123@gmail.com', 'India'),
('Savita', 'savita123@gmial.com', 'Lucknow'),
('Reena Kumari', 'reena123@gmail.com', 'Jaipur');

-- Insert Sample Products
INSERT INTO products (name, price, description) VALUES
('Product A', 600.00, 'High quality product A'),
('Product B', 700.00, 'Premium product B'),
('Product C', 800.00, 'Affordable product C'),
('Product D', 900.00, 'Luxury product D');


-- Insert Sample Orders
INSERT INTO orders (customer_id, order_date, total_amount) VALUES
(1, CURDATE() - INTERVAL 9 DAY, 750.00),
(2, CURDATE() - INTERVAL 8 DAY, 650.00),
(1, CURDATE() - INTERVAL 7 DAY, 500.00),
(3, CURDATE() - INTERVAL 6 DAY, 400.00);

-- Retrieve Customers who placed Orders in last 30 days
SELECT DISTINCT c.*
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date >= CURDATE() - INTERVAL 30 DAY;

-- Get Total Order Amount per Customer
SELECT c.name, SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;

-- Update Price of Product c
UPDATE products 
SET price = 85.00
WHERE name = 'Product C';

-- Add Discount column
ALTER TABLE products
ADD COLUMN discount DECIMAL(5,2) DEFAULT 0.00;

-- Get Top 3 most expensive Products
SELECT *
FROM products
ORDER BY price DESC
LIMIT 3;


-- Create Order_items Table first (needed for Product tracking)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert Sample Order items
INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 4, 1);

-- Retrieve Customers who Ordered Product A
SELECT DISTINCT c.name
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE p.name = 'Product A';

-- Retrieve Customer Name and Order Date
SELECT c.name, o.order_date
FROM customers c
JOIN orders o ON c.id = o.customer_id;

-- Retrieve high Value Orders
SELECT *
FROM orders
WHERE total_amount > 150.00;

-- Calculate Order Total dynamically
SELECT o.id AS order_id,
       SUM(p.price * oi.quantity) AS calculated_total
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY o.id;

-- Get Average Order Total
SELECT AVG(total_amount) AS average_order_value
FROM orders;