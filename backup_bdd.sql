/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: foot3000db
-- ------------------------------------------------------
-- Server version	10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Clubs`
--

DROP TABLE IF EXISTS `Clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Clubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `code_postal` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clubs`
--

LOCK TABLES `Clubs` WRITE;
/*!40000 ALTER TABLE `Clubs` DISABLE KEYS */;
INSERT INTO `Clubs` VALUES (1,'PSG','Paris','75001'),(2,'Real Madrid','Madrid','28001'),(3,'FC Barcelona','Barcelona','08001'),(4,'Manchester United','Manchester','M1 1AA'),(5,'Bayern Munich','Munich','80331'),(6,'Juventus','Turin','10100'),(7,'Chelsea FC','London','SW6 1HS'),(8,'AC Milan','Milan','20121'),(9,'Paris Saint-Germain','Paris','75016'),(10,'Liverpool FC','Liverpool','L4 0TH'),(11,'Arsenal FC','London','N5 1BU'),(12,'Borussia Dortmund','Dortmund','44135'),(13,'AS Roma','Rome','00100'),(14,'Inter Milan','Milan','20124'),(15,'Ajax Amsterdam','Amsterdam','1011 PJ'),(16,'Olympique Lyonnais','Lyon','69001'),(17,'Olympique Lyonnais','Lyon','69001'),(18,'AS Monaco','Monaco','98000'),(19,'AS Monaco','Monaco','98000'),(20,'PSG','Paris','98000');
/*!40000 ALTER TABLE `Clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Players`
--

DROP TABLE IF EXISTS `Players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Players` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `LastName` longtext NOT NULL,
  `FirstName` longtext NOT NULL,
  `Position` longtext NOT NULL,
  `TeamId` int(11) NOT NULL,
  `DateOfBirth` date NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Players_TeamId` (`TeamId`),
  CONSTRAINT `FK_Players_Teams_TeamId` FOREIGN KEY (`TeamId`) REFERENCES `Teams` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Players`
--

LOCK TABLES `Players` WRITE;
/*!40000 ALTER TABLE `Players` DISABLE KEYS */;
INSERT INTO `Players` VALUES (1,'KT','Karim','Gardien',3,'2000-01-01'),(2,'JR','Neymar','attanquant',2,'2000-01-01'),(3,'JR','Vini','attanquant',1,'2000-01-01'),(4,'Dupont','Pierre','Attaquant',1,'2000-01-01'),(5,'Charles','Alexis','Gardien',1,'1998-05-20'),(6,'eaea','eaea','devant',2,'2542-12-10'),(7,'Charles','Alexis','Gardien',1,'1998-05-20'),(8,'aa','aa','',2,'2024-08-28'),(9,'aa','aa','Goalkeeper',2,'2024-08-28'),(10,'a','a','StrikerRight',4,'2024-08-13'),(11,'a','zzz','DefenderRight',8,'2024-08-27');
/*!40000 ALTER TABLE `Players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teams`
--

DROP TABLE IF EXISTS `Teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teams` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` longtext NOT NULL,
  `City` longtext NOT NULL,
  `ClubId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teams`
--

LOCK TABLES `Teams` WRITE;
/*!40000 ALTER TABLE `Teams` DISABLE KEYS */;
INSERT INTO `Teams` VALUES (1,'Real Madird','Madird',1),(2,'FC Barcelone','Barcelone',2),(3,'PSG','Paris',3),(4,'Olympique Lyonnais','Lyon',17),(5,'AS Monaco U11','Monaco',19),(6,'Paris SG','Paris',20),(7,'Test Team','Test City',3),(8,'Test','Test',6);
/*!40000 ALTER TABLE `Teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__EFMigrationsHistory`
--

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__EFMigrationsHistory`
--

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES ('20241119122913_InitialCreate','8.0.2');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20 16:09:18
