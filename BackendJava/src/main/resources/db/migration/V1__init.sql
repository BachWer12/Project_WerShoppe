-- V1__init.sql
-- Create roles table and insert initial data if not exists

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT IGNORE INTO roles (name) VALUES ('ROLE_BUYER');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_SELLER');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_SELLER_STAFF');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_CS_AGENT');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_ADMIN');
