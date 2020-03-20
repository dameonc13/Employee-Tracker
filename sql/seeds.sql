	INSERT INTO department ( department_name) VALUES (  "Accounting");
	INSERT INTO department ( department_name) VALUES (  "Information Technology");
	INSERT INTO department ( department_name) VALUES (  "Sales");
	INSERT INTO department ( department_name) VALUES (  "Marketing");

	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Chief_Accountant", "200000", "1");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Chief_Information_Officer", "180000", "2");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Chief_Sales_Officer", "150000", "3");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Chief_Marketing_Officer", "150000", "4");

	INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ( "John", "Smith" , "1" , "1");
	INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ( "Ian", "Blackonski" , "2", "2" );
	INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( "Amy", "Ki" , "3", "3");
	INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ( "Isabel", "Santos" , "4", "4");

	-- Accountants 
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Senior_Accountant", "100000", "1");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Accounts_Payable_Officer", "80000", "1");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Staff_Accountant", "75000", "1");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Accounting_Intern", "38000", "1");

	INSERT INTO employee (  first_name, last_name, role_id) VALUES ( "Kayla", "Smite" , "5");
	INSERT INTO employee (  first_name, last_name, role_id) VALUES ( "Willie", "Williams" , "6");
	INSERT INTO employee (  first_name, last_name, role_id) VALUES ( "Andi", "Note" , "7");
	INSERT INTO employee (  first_name, last_name, role_id) VALUES ( "Renae", "Gayle" , "8");





	-- IT Personals
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Data_Anaylst", "120000", "2");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Full_Stack_Developer", "90000", "2");
	INSERT INTO employee_role ( title, salary, department_id) VALUES("Junior_Data_Analst", "80000", "2");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Web_Devolper_Intern", "45000", "2");

	INSERT INTO employee (  first_name, last_name, role_id) VALUES  ( "Ivan", "Goodie" , "9");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES ( "Sam", "Inavic" , "10");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES ( "Arjen", "Tolo" , "11");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES ( "Timothy", "Larga" , "12");

	-- Sales Personal
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Sales_Consulatant", "70000", "3");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ("Sales_Consulatant", "70000", "3");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Senior_Sales_Lead", "60000", "3");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Sales_Intern", "30000", "3");

	INSERT INTO employee ( first_name, last_name, role_id) VALUES( "Walker", "Ranger" , "13");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES( "Nile", "Lucca" , "14");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES ( "Wendy", "Willo" , "15");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES ( "Shilo", "Ervine" , "16");

	-- Marketing Peronal 

	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Marketing_Developer", "100000", "4");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Research_Analyst", "70000", "4");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Marketing_Leads_Officer", "65000", "4");
	INSERT INTO employee_role ( title, salary, department_id) VALUES ( "Marketing_Intern", "32000", "4");

	INSERT INTO employee ( first_name, last_name, role_id) VALUES ( "Sarah", "Saiil" , "17");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES( "Kera", "Ivanti" , "18");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES( "Joi", "Seoyong" , "19");
	INSERT INTO employee ( first_name, last_name, role_id) VALUES ( "Darnel", "Azebeltivani" , "20");
