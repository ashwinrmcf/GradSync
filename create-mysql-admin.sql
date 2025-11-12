-- Create admin user in MySQL database for authentication
-- Run this in your MySQL database

USE gradsync_db;

-- Insert admin user into MySQL users table
INSERT INTO users (
    email, 
    password, 
    first_name, 
    last_name, 
    role, 
    is_active, 
    is_verified, 
    email_verified, 
    branch, 
    roll_number, 
    batch_year, 
    created_at, 
    updated_at
) VALUES (
    'admin@piemr.edu.in',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewfhllQdHqByU1uq', -- password: admin123
    'Admin',
    'User',
    'ADMIN',
    1, -- is_active
    1, -- is_verified
    1, -- email_verified
    'CSE',
    'ADMIN001',
    2024,
    NOW(),
    NOW()
) ON DUPLICATE KEY UPDATE 
    password = VALUES(password),
    role = VALUES(role),
    is_active = VALUES(is_active),
    updated_at = NOW();

-- Verify the user was created
SELECT id, email, first_name, last_name, role, is_active FROM users WHERE email = 'admin@piemr.edu.in';

-- Show success message
SELECT 'Admin user created successfully in MySQL!' as message;
