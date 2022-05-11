INSERT INTO department(dept_name) 
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Customer Service");

INSERT INTO emp_role (title, salary, dept_id)
VALUES ("Software Developer", 80000, 1001),
       ("Salesperson", 60000, 1002),
       ("Accountant", 75000, 1003),
       ("Customer Liason", 50000, 1004),
       ("Engineering Manager", 90000, 1001),
       ("Sales Manager", 90000, 1002),
       ("Finance Manager", 90000, 1003),
       ("Customer Services Manager", 90000, 1004);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Michael", "Scott", 8, NULL),
("Dwight", "Shrute", 7, NULL),
("Stanley", "Hudson", 6, NULL),
("Jim", "Halpert", 5, NULL),
("Phyllis", "Vance", 3, 2),
("Andy", "Bernard", 3, 2),
("Ryan", "Howard", 1, 4),
("Angela", "Martin", 1, 4),
("Oscar", "Martinez", 4, 1),
("Kevin", "Malone", 4, 1),
("Pam", "Halpert", 2, 3),
("Toby", "Flenderson", 2, 3);