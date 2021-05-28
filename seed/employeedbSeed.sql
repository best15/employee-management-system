DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  D_name VARCHAR(30),
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT,
  primary key (id)
);
INSERT INTO
  department (D_name)
VALUES
  ("HR"),("Sales"),("Finance"),
  ("Engineering"),("Legal"),("Marketing");
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Software engineer", 120000, 4),("Sales executive", 120000, 2),
  ("Accountant", 100000, 3),("HR Manager", 150000, 1),
  ("Lawyer", 150000, 5),("sales person", 80000, 2),
  ("Marketing Head", 150000, 6);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Mike", "Sonic", 5, 7),("Tony", "Brown", 6, 5),
  ("Gerrard", "Buter", 7, null),("Kroos", "Muller", 1, 1),
  ("Steve", "Hut", 2, 7),("Sadio", "Mane", 3, 5),
  ("Bobby", "Dylon", 4, null),("Tom", "J", 6, 5),
  ("Kevin", "Jonson", 5, null);
select
  e1.id,
  e1.first_name,
  e1.last_name,
  role.title,
  role.salary,
  department.D_name AS Department,
  concat(e2.first_name, " ", e2.last_name) as Manager
from
  employee e1
  INNER JOIN role ON e1.role_id = role.id
  INNER JOIN department on role.department_id = department.id
  JOIN employee e2 on e1.manager_id = e2.id;