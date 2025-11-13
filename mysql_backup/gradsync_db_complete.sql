-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: gradsync_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event_registrations`
--

DROP TABLE IF EXISTS `event_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_registrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `attended` bit(1) NOT NULL,
  `cancelled_at` datetime(6) DEFAULT NULL,
  `feedback` text,
  `payment_reference` varchar(255) DEFAULT NULL,
  `payment_status` enum('NOT_REQUIRED','PENDING','COMPLETED','FAILED','REFUNDED') DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `registered_at` datetime(6) NOT NULL,
  `special_requirements` text,
  `status` enum('REGISTERED','CONFIRMED','CANCELLED','WAITLISTED') NOT NULL,
  `event_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6eykq6wu4n23qhn5vwb8kyut5` (`event_id`),
  KEY `FKnk7jh3bmmv11csoxkjnb6av4h` (`user_id`),
  CONSTRAINT `FK6eykq6wu4n23qhn5vwb8kyut5` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  CONSTRAINT `FKnk7jh3bmmv11csoxkjnb6av4h` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_registrations`
--

LOCK TABLES `event_registrations` WRITE;
/*!40000 ALTER TABLE `event_registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `agenda` text,
  `created_at` datetime(6) NOT NULL,
  `description` text,
  `end_date` datetime(6) DEFAULT NULL,
  `event_date` datetime(6) NOT NULL,
  `event_image_url` varchar(255) DEFAULT NULL,
  `event_type` enum('REUNION','WORKSHOP','WEBINAR','NETWORKING','CAREER_FAIR','SEMINAR','CONFERENCE','SOCIAL','SPORTS','CULTURAL') NOT NULL,
  `is_active` bit(1) NOT NULL,
  `is_free` bit(1) NOT NULL,
  `location` varchar(255) NOT NULL,
  `max_participants` int DEFAULT NULL,
  `meeting_link` varchar(255) DEFAULT NULL,
  `registration_deadline` datetime(6) DEFAULT NULL,
  `registration_fee` double DEFAULT NULL,
  `requirements` text,
  `speakers` text,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `organizer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdocju8m76a3f8o6ljh2jrn2ra` (`organizer_id`),
  CONSTRAINT `FKdocju8m76a3f8o6ljh2jrn2ra` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_applications`
--

DROP TABLE IF EXISTS `job_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_applications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `applied_at` datetime(6) NOT NULL,
  `cover_letter` text,
  `notes` text,
  `resume_url` varchar(255) DEFAULT NULL,
  `reviewed_at` datetime(6) DEFAULT NULL,
  `status` enum('APPLIED','UNDER_REVIEW','SHORTLISTED','INTERVIEW_SCHEDULED','REJECTED','ACCEPTED','WITHDRAWN') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `applicant_id` bigint NOT NULL,
  `job_posting_id` bigint NOT NULL,
  `reviewed_by` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhc9mlq46hw527pcfae7m9xsu3` (`applicant_id`),
  KEY `FKfjwyy10f2yywhxflbf9trb6nb` (`job_posting_id`),
  KEY `FK6953vbduj27isyy9ujh74gqab` (`reviewed_by`),
  CONSTRAINT `FK6953vbduj27isyy9ujh74gqab` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`),
  CONSTRAINT `FKfjwyy10f2yywhxflbf9trb6nb` FOREIGN KEY (`job_posting_id`) REFERENCES `job_postings` (`id`),
  CONSTRAINT `FKhc9mlq46hw527pcfae7m9xsu3` FOREIGN KEY (`applicant_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_applications`
--

LOCK TABLES `job_applications` WRITE;
/*!40000 ALTER TABLE `job_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_postings`
--

DROP TABLE IF EXISTS `job_postings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_postings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `application_deadline` datetime(6) DEFAULT NULL,
  `application_email` varchar(255) DEFAULT NULL,
  `application_instructions` text,
  `application_url` varchar(255) DEFAULT NULL,
  `benefits` text,
  `company` varchar(255) NOT NULL,
  `company_logo_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` text NOT NULL,
  `experience_level` varchar(255) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `is_urgent` bit(1) NOT NULL,
  `job_type` enum('FULL_TIME','PART_TIME','INTERNSHIP','CONTRACT','FREELANCE') NOT NULL,
  `location` varchar(255) NOT NULL,
  `requirements` text,
  `salary_range` varchar(255) DEFAULT NULL,
  `skills` text,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `views_count` int NOT NULL,
  `posted_by` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1fkt8vrliu4lat6whj098osbq` (`posted_by`),
  CONSTRAINT `FK1fkt8vrliu4lat6whj098osbq` FOREIGN KEY (`posted_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_postings`
--

LOCK TABLES `job_postings` WRITE;
/*!40000 ALTER TABLE `job_postings` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_postings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `batch_year` varchar(255) NOT NULL,
  `bio` text,
  `branch` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `current_company` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified` bit(1) NOT NULL,
  `experience_years` int DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `graduation_date` datetime(6) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `is_verified` bit(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `portfolio_url` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `role` enum('ALUMNI','STUDENT','ADMIN','FACULTY') NOT NULL,
  `roll_number` varchar(255) NOT NULL,
  `skills` text,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK_bav7qiaas16cr7jn0eb4n7fy0` (`roll_number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'2024',NULL,'CSE','2025-11-13 02:21:32.000000',NULL,'admin@piemr.edu.in',_binary '',NULL,'Admin',NULL,_binary '',_binary '','2025-11-12 20:53:53.439370','User',NULL,NULL,'$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,NULL,NULL,NULL,'ADMIN','ADMIN001',NULL,'2025-11-12 20:53:53.456491');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gradsync_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-13 18:43:11
