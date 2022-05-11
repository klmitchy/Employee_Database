DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE emp_role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10,2),
dept_id INT NOT NULL,
FOREIGN KEY (dept_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES emp_role(id)
);