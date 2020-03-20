DROP DATABASE Employee_Tracker;
CREATE DATABASE Employee_Tracker;
USE Employee_Tracker;

CREATE TABLE Department(
id SMALLINT AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE employee_role(
id SMALLINT AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id SMALLINT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES Department(id) ON DELETE CASCADE

);


CREATE TABLE employee(
id SMALLINT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id SMALLINT,
manager_id SMALLINT NULL,
PRIMARY KEY(id),
FOREIGN KEY (manager_id) REFERENCES Employee(id) ON DELETE SET NULL,
FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE CASCADE


);