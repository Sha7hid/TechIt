// db.js

import mysql from 'mysql2/promise';
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Get all products
export async function getProducts() {
  const [rows] = await pool.query("SELECT * FROM Products");
  return rows;
}

// Get a product by ID
export async function getProduct(id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM Products
    WHERE Product_ID = ?
  `, [id]);
  return rows[0];
}

// Create a new product
export async function createProduct(productName, price, details, processor, memory, image) {
  const result = await pool.query(`
    INSERT INTO Products (Product_Name, Price, Details, Processor, Memory, Image)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [productName, price, details, processor, memory, image]);

  const id = result[0].insertId;
  return getProduct(id);
}

// Update a product
export async function updateProduct(id, productName, price, details, processor, memory, image) {
  await pool.query(
    `
    UPDATE Products
    SET Product_Name = ?, Price = ?, Details = ?, Processor = ?, Memory = ?, Image = ?
    WHERE Product_ID = ?;
    `,
    [productName, price, details, processor, memory, image, id]
  );
  return getProduct(id);
}

// Delete a product
export async function deleteProduct(id) {
  await pool.query(`
    DELETE FROM Products
    WHERE Product_ID = ?
  `, [id]);
}

// Get all users
export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

// Get a user by email and password
export async function getUserByEmailAndPassword(email, password) {
  const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE email = ? AND password = ?
  `, [email, password]);
  return rows[0];
}

// Get a user by email
export async function getUserByEmail(email) {
  const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE email = ?
  `, [email]);
  return rows[0];
}

// Get a user by ID
export async function getUser(userId) {
  const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE user_id = ?
  `, [userId]);
  return rows[0];
}

// Create a new user
export async function createUser(user) {
  const {username,email,password} = user;
  const result = await pool.query(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `, [username, email, password]);

  const id = result[0].insertId;
  return getUser(id);
}

// Update a user
export async function updateUser(userId, username, email, password) {
  await pool.query(
    `
    UPDATE users
    SET username = ?, email = ?, password = ?
    WHERE user_id = ?;
    `,
    [username, email, password, userId]
  );
  return getUser(userId);
}

// Delete a user
export async function deleteUser(userId) {
  await pool.query(`
    DELETE FROM users
    WHERE user_id = ?
  `, [userId]);
}
// Create a new cart item
export async function createCartItem(cart) {
  const {userId,productId,quantity} = cart;
  const result = await pool.query(`
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `, [userId, productId, quantity]);

  const id = result[0].insertId;
  return getCartItem(id);
}
export async function getCartItem(id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM cart
    WHERE cart_id = ?
  `, [id]);

  return rows[0];
}

// Update a cart item
export async function updateCartItem(id, userId, productId, quantity) {
  await pool.query(
    `
    UPDATE cart
    SET user_id = ?, product_id = ?, quantity = ?
    WHERE cart_id = ?;
    `,
    [userId, productId, quantity, id]
  );
  return getCartItem(id);
}

// Delete a cart item
export async function deleteCartItem(id) {
  await pool.query(`
    DELETE FROM cart
    WHERE cart_id = ?
  `, [id]);
}

// Get all cart items for a user
export async function getCartItemsForUser(userId) {
  const [rows] = await pool.query(`
    SELECT *
    FROM cart
    WHERE user_id = ?
  `, [userId]);
  return rows;
}

// Create a new order
export async function createOrder(userId, productId, orderStatus) {
  const result = await pool.query(`
    INSERT INTO orders (user_id, product_id, order_status)
    VALUES (?, ?, ?)
  `, [userId, productId, orderStatus]);

  const id = result[0].insertId;
  return getOrder(id);
}

// Update an order
export async function updateOrder(id, userId, productId, orderStatus) {
  await pool.query(
    `
    UPDATE orders
    SET user_id = ?, product_id = ?, order_status = ?
    WHERE order_id = ?;
    `,
    [userId, productId, orderStatus, id]
  );
  return getOrder(id);
}

// Get all orders for a user
export async function getOrdersForUser(userId) {
  const [rows] = await pool.query(`
    SELECT *
    FROM orders
    WHERE user_id = ?
  `, [userId]);
  return rows;
}


export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getCartItemsForUser,
  getCartItem,
  createOrder,
  updateOrder,
  getOrdersForUser,
  getUsers,
  getUserByEmailAndPassword,
  getUserByEmail,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
