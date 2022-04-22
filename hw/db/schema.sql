CREATE DATABASE emp_tracker_db;

USE emp_tracker_db;

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