CREATE DATABASE LEAVEAPPLICATION;
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    EmployeeName VARCHAR(255),
    EmployeeEmailAddress VARCHAR(255) UNIQUE,
    ManagerEmailAddress VARCHAR(255),
	Password NVARCHAR(50)
);

CREATE TABLE Leaves (
    LeaveID INT PRIMARY KEY IDENTITY(1,1) ,
    EmployeeID INT,
    LeaveStartDate DATETIME,
    LeaveEndDate DATETIME,
    ReasonForLeave VARCHAR(1000),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
	TotalDays AS 
    CASE 
        WHEN CAST(LeaveStartDate AS DATE) = CAST(LeaveEndDate AS DATE) THEN 1
        ELSE DATEDIFF(DAY, LeaveStartDate, LeaveEndDate) + 1
    END,
	Status NVARCHAR(50)
);


-- Inserting data into the Employees table
INSERT INTO Employees 
VALUES
    (1, 'John Doe', 'john.doe@example.com', 'manager@example.com','123var'),
    (2, 'Jane Smith', 'jane.smith@example.com', 'manager@example.com','345abc'),
    (3, 'Alice Johnson', 'alice.johnson@example.com', 'manager@example.com','sat567');


-- Inserting data into the Leaves table
INSERT INTO Leaves
VALUES
    (1, '2024-04-20', '2024-04-25', 'Vacation','Active'),
    (2, '2024-05-01', '2024-05-05', 'Family emergency','Cancelled'), 
    (3, '2024-04-22', '2024-04-24', 'Sick leave','Cancelled');

SELECT * FROM LEAVES;
select * from Employees;

truncate table leaves;
truncate table employees;

UPDATE Employees
SET EmployeeEmailAddress = 'john.doe@gmail.com', ManagerEmailAddress= 'manager@gmail.com'
WHERE EmployeeID = 1;

UPDATE Employees
SET EmployeeEmailAddress = 'jane.smith@gmail.com', ManagerEmailAddress= 'manager@gmail.com'
WHERE EmployeeID = 2;

UPDATE Employees
SET EmployeeEmailAddress = 'alice.johnson@gmail.com', ManagerEmailAddress= 'manager@gmail.com'
WHERE EmployeeID = 3;











