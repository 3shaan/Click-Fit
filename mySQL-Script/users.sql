--create database
CREATE DATABASE test

--select database
USE test

-- create user table 
CREATE TABLE users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    active TINYINT DEFAULT 1,
    PRIMARY KEY (ID)
);

--Add user procedure 

DELIMITER //

CREATE PROCEDURE addUser(
    IN userEmail VARCHAR(255),
    IN userPassword VARCHAR(255),
    IN userType VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type)
    VALUES (userEmail, userPassword, userType);
END;
//
DELIMITER ;

-- call add user to store the data 

CALL addUser('user@example.com', 'password123', 'regular');