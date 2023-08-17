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

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  getUserByEmailAndPassword,
  getUserByEmail,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
