CREATE DATABASE  IF NOT EXISTS `wpdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `wpdb`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: wpdb
-- ------------------------------------------------------
-- Server version	5.7.10-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Dog`
--

DROP TABLE IF EXISTS `Dog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adopted` tinyint(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `color` varchar(255) DEFAULT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `story` text,
  `gender` varchar(255) DEFAULT NULL,
  `foster` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `dog_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dog`
--

LOCK TABLES `Dog` WRITE;
/*!40000 ALTER TABLE `Dog` DISABLE KEYS */;
INSERT INTO `Dog` VALUES (1,0,'Jovana','Good with: kids, cats','Mix','Mix',1,15,NULL,'female',NULL,'https://7068-presscdn-0-62-pagely.netdna-ssl.com/wp-content/uploads/2013/08/Stray_dog.jpg',1),(2,0,'Paulina','Good with: kids, cats','Mix','Mix',1,20,NULL,'female',NULL,'http://www.labradorretrieverguide.com/wp-content/uploads/2015/12/What-To-Do-When-You-See-A-Stray-Dog.jpg',1),(3,0,'Nella','Good with: kids, cats','black','Mix',2,3,'Meet lovely Nella! (beginning of video)When Nelson was kicked and his eye was injured to total loss I had to engage in rescue operation at night.I discovered that the same man who kicked Nelson also kicked one of his sisters and she was found nearby the location by another girl with the same situation, again loss of an eye.It was impossible to get Ella and the puppies to safe as the man who was kicking them did not let us take them. He was out of control and saying they are better on the street and breeding and he will give them to some shepherds in his village. Ella and her puppies were rescued although the man took revenge and stole the dogs that the girl who was feeding them had in her yard.We discovered he was really a hoarder. we thought that we got all of them but then the girl spotted that man again and one very similar puppy to Nelsons was following him. She previously had been in a psychical fight with him so she laid low as I advised her that man is dangerous and that she should not show that we discovered the last puppy was taken by him. After months (just as time for heat approached) he let the puppy out back on the street and naturally she came to the bushes where she was born.The girl informed me without making any noise and we secretly lead her away from there with some food and as soon as we were safe to get her we grabbed her and put her in the car together safely and immediately made appointment and took her to be sterilized as we did not know if that horrible man will appear from somewhere around the corner and claim the dog from us.Now she is done and safe and never going back there. We gave her a name Nella after Nelson and Ella the mother. She is ready to travel - as are all the other dogs there.','female',NULL,'images/stella.jpg',NULL);
/*!40000 ALTER TABLE `Dog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donation`
--

DROP TABLE IF EXISTS `Donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Donation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` float DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donation`
--

LOCK TABLES `Donation` WRITE;
/*!40000 ALTER TABLE `Donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job` varchar(255) DEFAULT NULL,
  `salary` float DEFAULT NULL,
  `userType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Story`
--

DROP TABLE IF EXISTS `Story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Story` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `date` datetime DEFAULT NULL,
  `EmployeeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeId` (`EmployeeId`),
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Story`
--

LOCK TABLES `Story` WRITE;
/*!40000 ALTER TABLE `Story` DISABLE KEYS */;
INSERT INTO `Story` VALUES (1,'images/story2.jpg','Remember our pound pups Shadow and Chance?','- who together beat both parvo and distemper they got in pound . Now they are both living a lovely life in Scotland.','2015-08-08 00:00:00',NULL),(2,'images/story1.jpg','Street dogs adopted happiness!','Daisy was found on the streets starving skinny and badly dehydrated. Street pup Bobby had such a badly infected leg it had to be amputated.','2017-01-01 00:00:00',NULL);
/*!40000 ALTER TABLE `Story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_digest` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `EmployeeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `User_username_unique` (`username`),
  UNIQUE KEY `user_email_username` (`email`,`username`),
  KEY `EmployeeId` (`EmployeeId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'amela','amela.spica@gmail.com','123','Amela','Špica','http://www.freeiconspng.com/uploads/woman-icon-8.png',NULL),(4,'admin','admin@admin.com','a','Admin',NULL,'http://interworldgems.com/client_login/admin/images/login_icon.png',NULL),(10,'amela.spica@gmail.com','as7849@student.uni-lj.sia','123',NULL,NULL,NULL,NULL),(12,'as29','as7849@student.uni-lj.si','a','New','User','https://cdn0.iconfinder.com/data/icons/user-pictures/100/female-512.png',NULL),(13,'assada','amela.spica@gmsail.com','123',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_meta`
--

DROP TABLE IF EXISTS `acl_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_meta` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_meta`
--

LOCK TABLES `acl_meta` WRITE;
/*!40000 ALTER TABLE `acl_meta` DISABLE KEYS */;
INSERT INTO `acl_meta` VALUES ('roles','[\"admin\",\"user\"]','2017-01-10 09:43:59','2017-01-14 15:57:50'),('users','[4,\"admin\",\"amela\",\"as29\",\"assada\"]','2017-01-10 09:43:58','2017-01-14 15:57:50');
/*!40000 ALTER TABLE `acl_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_parents`
--

DROP TABLE IF EXISTS `acl_parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_parents` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_parents`
--

LOCK TABLES `acl_parents` WRITE;
/*!40000 ALTER TABLE `acl_parents` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl_parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_permissions`
--

DROP TABLE IF EXISTS `acl_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_permissions` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_permissions`
--

LOCK TABLES `acl_permissions` WRITE;
/*!40000 ALTER TABLE `acl_permissions` DISABLE KEYS */;
INSERT INTO `acl_permissions` VALUES ('allows_admin','{\"admin\":[\"view\"]}','2017-01-11 18:10:11','2017-01-14 15:57:50'),('allows_ourdogs','{\"admin\":[\"view\"]}','2017-01-10 09:43:59','2017-01-11 18:09:21'),('allows_profile','{\"user\":[\"view\",\"edit\"],\"admin\":[\"view\",\"edit\"]}','2017-01-10 20:59:19','2017-01-14 15:57:50');
/*!40000 ALTER TABLE `acl_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_resources`
--

DROP TABLE IF EXISTS `acl_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_resources` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_resources`
--

LOCK TABLES `acl_resources` WRITE;
/*!40000 ALTER TABLE `acl_resources` DISABLE KEYS */;
INSERT INTO `acl_resources` VALUES ('admin','[\"ourdogs\",\"profile\",\"admin\"]','2017-01-10 09:43:59','2017-01-14 15:57:50'),('user','[\"profile\"]','2017-01-10 20:59:19','2017-01-14 15:57:50');
/*!40000 ALTER TABLE `acl_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_roles`
--

DROP TABLE IF EXISTS `acl_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_roles` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_roles`
--

LOCK TABLES `acl_roles` WRITE;
/*!40000 ALTER TABLE `acl_roles` DISABLE KEYS */;
INSERT INTO `acl_roles` VALUES ('admin','[4,\"admin\"]','2017-01-10 09:43:59','2017-01-14 15:57:50'),('user','[\"amela\",\"as29\",\"assada\"]','2017-01-10 20:59:19','2017-01-14 15:57:50');
/*!40000 ALTER TABLE `acl_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_users`
--

DROP TABLE IF EXISTS `acl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_users` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_users`
--

LOCK TABLES `acl_users` WRITE;
/*!40000 ALTER TABLE `acl_users` DISABLE KEYS */;
INSERT INTO `acl_users` VALUES ('4','[\"admin\"]','2017-01-10 09:43:59','2017-01-10 20:14:53'),('admin','[\"admin\"]','2017-01-10 20:25:41','2017-01-14 15:57:50'),('amela','[\"user\"]','2017-01-10 20:59:19','2017-01-14 15:57:50'),('as29','[\"user\"]','2017-01-11 19:41:42','2017-01-11 19:41:42'),('assada','[\"user\"]','2017-01-14 14:25:06','2017-01-14 14:25:06');
/*!40000 ALTER TABLE `acl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-14 18:44:18
