CREATE DATABASE  IF NOT EXISTS `snowballteam` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `snowballteam`;

-- utf8mb4_0900_ai_ci --> utf8mb4_general_ci

-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: snowballteam
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime DEFAULT NULL,
  `boarder` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id` (`post_id`),
  KEY `boarder` (`boarder`),
  CONSTRAINT `board_ibfk_1` FOREIGN KEY (`boarder`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'안녕하세요','반갑습니다','2022-06-11 15:49:04','iwo'),(2,'안녕하세요','반갑습니다','2022-06-11 15:49:28','g');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `post_id` int unsigned NOT NULL,
  `comment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime DEFAULT NULL,
  `commenter` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id` (`comment_id`),
  KEY `post_id` (`post_id`),
  KEY `commenter` (`commenter`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `board` (`post_id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`commenter`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,1,'어서와요','2022-06-11 15:49:36','g');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(5000) COLLATE utf8mb4_general_ci NOT NULL,
  `answer` varchar(5000) COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL,
  `boarder` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id` (`post_id`),
  KEY `boarder` (`boarder`),
  CONSTRAINT `faq_ibfk_1` FOREIGN KEY (`boarder`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'1.후쿠오카에 가게되면 주로 하는것이 무엇인가요?','ナレ・コミュニケーション・アカデミー에서 원어민과 수준별 분반 수업을 주로 듣게 될것입니다.','2022-06-11 15:48:42','iwo'),(2,'2.현지 학습기간중 해야하는 것이 있습니까?','현지 학습기간동안 경험한것들을 토대로 만든 UCC를 제작하여 발표를 해야합니다.','2022-06-11 15:48:53','iwo');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `passwd` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(5000) COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(5000) COLLATE utf8mb4_general_ci NOT NULL,
  `noticer` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id` (`post_id`),
  KEY `noticer` (`noticer`),
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`noticer`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'공지사항입니다','참고해주세요','iwo','2022-06-11 15:48:13'),(2,'안녕하세요','반갑습니다','iwo','2022-06-11 15:48:20');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `professorId` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `class` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `tell` int NOT NULL,
  PRIMARY KEY (`professorId`),
  UNIQUE KEY `professorId` (`professorId`),
  UNIQUE KEY `tell` (`tell`),
  CONSTRAINT `professor_ibfk_1` FOREIGN KEY (`professorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qboard`
--

DROP TABLE IF EXISTS `qboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qboard` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL,
  `boarder` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id` (`post_id`),
  KEY `boarder` (`boarder`),
  CONSTRAINT `qboard_ibfk_1` FOREIGN KEY (`boarder`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qboard`
--

LOCK TABLES `qboard` WRITE;
/*!40000 ALTER TABLE `qboard` DISABLE KEYS */;
/*!40000 ALTER TABLE `qboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qcomment`
--

DROP TABLE IF EXISTS `qcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qcomment` (
  `post_id` int unsigned NOT NULL,
  `comment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime DEFAULT NULL,
  `commenter` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id` (`comment_id`),
  KEY `post_id` (`post_id`),
  KEY `commenter` (`commenter`),
  CONSTRAINT `qcomment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `qboard` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `qcomment_ibfk_2` FOREIGN KEY (`commenter`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qcomment`
--

LOCK TABLES `qcomment` WRITE;
/*!40000 ALTER TABLE `qcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `qcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(300) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'user id',
  `passwd` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `tel` int NOT NULL,
  `grade` varchar(200) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `email` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `yjuclass` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `github` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `instagram` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kakao` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `tel` (`tel`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `github` (`github`),
  UNIQUE KEY `instagram` (`instagram`),
  UNIQUE KEY `kakao` (`kakao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('asd','asd','김태헌',1045687894,'2','aasdsd@naver.com','WD-J','Motitory','honey___kim',NULL),('dfg','dfg','이동현',1012345678,'2','aaa@naver.com','WD-J','ASTER18K','a__s__t__e__r__i__s__k__',NULL),('g','g','이동근',1028828282,'2','asd@naver.com','WD-J','ezfood3','ezfo_od3',NULL),('ghj','ghj','김다운',1023456789,'2','vvv@naver.com','WD-J','wooniekim','woony__kim',NULL),('iwo','iwo','admim',1023491827,'3','uuu@naver.com','WD-J',NULL,NULL,NULL),('jnm','jnm','유창훈',1034567891,'2','bbb@naver.com','WD-J','inhyoe','99_changhoon',NULL),('mlk','mlk','김정민',1045678912,'2','nnn@naver.com','WD-J','liosy1114','liosy1114',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-12  0:51:28
