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
  ("HR"),("Sales")("Finance"),
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
  ("Mike", "Sonic", 5, 1),("Tony", "Brown", 6, 2),
  ("Gerrard", "Buter", 7,),("Kroos", "Muller", 1, 4),
  ("Steve", "Hut", 2, 7),("Sadio", "Mane", 3, 5),
  ("Bobby", "Dylon", 4,),("Tom", "J", 6, 2),
  ("Kevin", "Jonson", 5,);