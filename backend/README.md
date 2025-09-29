# GradSync Backend - PIEMR Alumni Portal API

A comprehensive Spring Boot backend for the GradSync alumni networking platform.

## 🚀 Features

### **Authentication & Security**
- JWT-based authentication with access and refresh tokens
- Role-based access control (ALUMNI, STUDENT, ADMIN, FACULTY)
- Password encryption with BCrypt
- Secure API endpoints with Spring Security
- CORS configuration for frontend integration

### **User Management**
- User registration and login
- Profile management with comprehensive fields
- Alumni directory with advanced search and filtering
- Batch-wise and branch-wise user organization
- User statistics and analytics

### **Database Schema**
- **Users**: Complete user profiles with academic and professional info
- **Job Postings**: Job opportunities with application tracking
- **Job Applications**: Application management system
- **Events**: Alumni events and registrations
- **Event Registrations**: Event participation tracking

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Security**: Spring Security 6 + JWT
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **Documentation**: Built-in API endpoints

## 📦 Project Structure

```
src/main/java/com/piemr/gradsync/
├── config/                 # Configuration classes
│   └── SecurityConfig.java # Security configuration
├── controller/             # REST controllers
│   ├── AuthController.java # Authentication endpoints
│   └── UserController.java # User management endpoints
├── dto/                    # Data Transfer Objects
│   ├── auth/              # Authentication DTOs
│   └── user/              # User DTOs
├── entity/                # JPA entities
│   ├── User.java          # User entity
│   ├── JobPosting.java    # Job posting entity
│   ├── JobApplication.java # Job application entity
│   ├── Event.java         # Event entity
│   └── EventRegistration.java # Event registration entity
├── repository/            # Data repositories
│   ├── UserRepository.java # User data access
│   └── JobPostingRepository.java # Job data access
├── security/              # Security components
│   ├── JwtAuthenticationFilter.java
│   └── JwtAuthenticationEntryPoint.java
├── service/               # Business logic
│   ├── AuthService.java   # Authentication service
│   └── UserDetailsServiceImpl.java # User details service
├── util/                  # Utility classes
│   └── JwtUtil.java       # JWT utility functions
└── GradSyncApplication.java # Main application class
```

## 🔧 Setup & Installation

### **Prerequisites**
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, VS Code)

### **Database Setup**
1. Install MySQL and create a database:
```sql
CREATE DATABASE gradsync_db;
CREATE USER 'gradsync_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON gradsync_db.* TO 'gradsync_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Update `application.yml` with your database credentials:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/gradsync_db
    username: gradsync_user
    password: your_password
```

### **Environment Variables**
Create a `.env` file or set environment variables:
```bash
JWT_SECRET=your-super-secret-jwt-key-here
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### **Run the Application**
```bash
# Clone the repository
git clone <repository-url>
cd gradsync/backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

## 📚 API Endpoints

### **Authentication Endpoints**
```http
POST /api/auth/register          # User registration
POST /api/auth/login             # User login
POST /api/auth/refresh           # Refresh JWT token
POST /api/auth/validate          # Validate JWT token
POST /api/auth/check-email       # Check if email exists
POST /api/auth/check-roll-number # Check if roll number exists
POST /api/auth/change-password   # Change user password
GET  /api/auth/me               # Get current user info
```

### **User Management Endpoints**
```http
GET  /api/users/me              # Get current user profile
GET  /api/users/directory       # Get alumni directory with filters
GET  /api/users/filters         # Get filter options (batches, branches, etc.)
GET  /api/users/stats           # Get user statistics
GET  /api/users/{id}            # Get user by ID
GET  /api/users/recent          # Get recent users
```

### **Request/Response Examples**

#### **User Registration**
```json
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "batchYear": "2020",
  "branch": "Computer Science Engineering",
  "rollNumber": "20CS001",
  "currentCompany": "Google",
  "position": "Software Engineer",
  "location": "Bangalore, India",
  "role": "ALUMNI"
}
```

#### **User Login**
```json
POST /api/auth/login
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### **Response Format**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400,
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "ALUMNI",
    "batchYear": "2020",
    "branch": "Computer Science Engineering"
  },
  "success": true,
  "message": "Authentication successful"
}
```

## 🔐 Security Features

### **JWT Authentication**
- Access tokens (24 hours validity)
- Refresh tokens (7 days validity)
- Secure token validation and refresh mechanism

### **Password Security**
- BCrypt password hashing
- Password strength validation
- Secure password change functionality

### **API Security**
- CORS configuration for frontend integration
- Request validation and sanitization
- Role-based endpoint protection

## 📊 Database Schema

### **Users Table**
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    batch_year VARCHAR(10) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    current_company VARCHAR(100),
    position VARCHAR(100),
    location VARCHAR(100),
    profile_image_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    bio TEXT,
    skills TEXT,
    role ENUM('ALUMNI', 'STUDENT', 'ADMIN', 'FACULTY') DEFAULT 'ALUMNI',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(20),
    experience_years INT,
    graduation_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME
);
```

## 🚀 Deployment

### **Production Configuration**
1. Update `application.yml` for production:
```yaml
spring:
  profiles:
    active: prod
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}

jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000
```

2. Build for production:
```bash
mvn clean package -Pprod
```

3. Run the JAR file:
```bash
java -jar target/gradsync-backend-0.0.1-SNAPSHOT.jar
```

## 🧪 Testing

```bash
# Run all tests
mvn test

# Run with coverage
mvn test jacoco:report
```

## 📝 API Documentation

The API includes built-in documentation. Once running, visit:
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- API Docs: `http://localhost:8080/api/v3/api-docs`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the PIEMR Alumni Community**
