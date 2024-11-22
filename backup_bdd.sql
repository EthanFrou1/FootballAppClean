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
INSERT INTO `Clubs` VALUES (1,'PSG','Paris','75001'),(2,'Real Madrid','Madrid','28001'),(3,'FC Barcelona','Barcelona','08001'),(4,'Manchester United','Manchester','M1 1AA'),(5,'Bayern Munich','Munich','80331'),(6,'Juventus','Turin','10100'),(7,'Chelsea FC','London','SW6 1HS'),(8,'AC Milan','Milan','20121'),(9,'Paris Saint-Germain','Paris','75016'),(10,'Liverpool FC','Liverpool','L4 0TH'),(11,'Arsenal FC','London','N5 1BU'),(12,'Borussia Dortmund','Dortmund','44135'),(13,'AS Roma','Rome','00100'),(14,'Inter Milan','Milan','20124'),(15,'Ajax Amsterdam','Amsterdam','1011 PJ'),(16,'Olympique Lyonnais','Lyon','69001'),(18,'AS Monaco','Monaco','98000'),(20,'PSG','Paris','98000');
/*!40000 ALTER TABLE `Clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MatchStats`
--

DROP TABLE IF EXISTS `MatchStats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MatchStats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `match_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `goals` int(11) DEFAULT 0,
  `assists` int(11) DEFAULT 0,
  `yellow_cards` int(11) DEFAULT 0,
  `red_cards` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `match_id` (`match_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `MatchStats_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `Matches` (`id`),
  CONSTRAINT `MatchStats_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `Players` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MatchStats`
--

LOCK TABLES `MatchStats` WRITE;
/*!40000 ALTER TABLE `MatchStats` DISABLE KEYS */;
INSERT INTO `MatchStats` VALUES (1,1,1,2,1,0,0),(2,1,2,1,0,1,0),(3,2,3,1,0,1,0),(4,2,4,0,1,0,0);
/*!40000 ALTER TABLE `MatchStats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Matches`
--

DROP TABLE IF EXISTS `Matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `home_team_id` int(11) NOT NULL,
  `away_team_id` int(11) NOT NULL,
  `home_team_score` int(11) DEFAULT 0,
  `away_team_score` int(11) DEFAULT 0,
  `match_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `home_team_id` (`home_team_id`),
  KEY `away_team_id` (`away_team_id`),
  CONSTRAINT `Matches_ibfk_1` FOREIGN KEY (`home_team_id`) REFERENCES `Teams` (`Id`),
  CONSTRAINT `Matches_ibfk_2` FOREIGN KEY (`away_team_id`) REFERENCES `Teams` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Matches`
--

LOCK TABLES `Matches` WRITE;
/*!40000 ALTER TABLE `Matches` DISABLE KEYS */;
INSERT INTO `Matches` VALUES (1,1,2,0,0,'2024-11-23 00:00:00'),(2,3,4,0,0,'2024-11-24 00:00:00');
/*!40000 ALTER TABLE `Matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PlayerStats`
--

DROP TABLE IF EXISTS `PlayerStats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PlayerStats` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `MatchId` int(11) NOT NULL,
  `PlayerId` int(11) NOT NULL,
  `Goals` int(11) NOT NULL DEFAULT 0,
  `Assists` int(11) NOT NULL DEFAULT 0,
  `YellowCards` int(11) NOT NULL DEFAULT 0,
  `RedCards` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  KEY `MatchId` (`MatchId`),
  KEY `PlayerId` (`PlayerId`),
  CONSTRAINT `PlayerStats_ibfk_1` FOREIGN KEY (`MatchId`) REFERENCES `Matches` (`id`) ON DELETE CASCADE,
  CONSTRAINT `PlayerStats_ibfk_2` FOREIGN KEY (`PlayerId`) REFERENCES `Players` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlayerStats`
--

LOCK TABLES `PlayerStats` WRITE;
/*!40000 ALTER TABLE `PlayerStats` DISABLE KEYS */;
INSERT INTO `PlayerStats` VALUES (1,1,1,1,0,0,0),(2,1,2,0,1,1,0),(3,1,3,0,0,0,0),(4,1,4,2,0,0,0),(5,2,1,0,0,0,0),(6,2,2,1,0,0,0),(7,2,3,1,1,0,0),(8,2,4,0,1,0,0);
/*!40000 ALTER TABLE `PlayerStats` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Players`
--

LOCK TABLES `Players` WRITE;
/*!40000 ALTER TABLE `Players` DISABLE KEYS */;
INSERT INTO `Players` VALUES (1,'KT','Karim','Gardien',1,'2000-01-01'),(2,'JR','Neymar','attanquant',2,'2000-01-01'),(3,'JR','Vini','attanquant',1,'2000-01-01'),(4,'Dupont','Pierre','Attaquant',1,'2000-01-01'),(10,'a','a','StrikerRight',4,'2024-08-13'),(11,'a','zzz','DefenderRight',8,'2024-08-27'),(12,'Frou','Ethan','DefenderCentreLeft',2,'2024-03-19'),(14,'Martin','Jean','DefenderLeft',1,'1994-07-14'),(15,'Lemoine','Lucas','DefenderCentreLeft',1,'1993-10-20'),(16,'Lopez','Marc','DefenderCentreRight',1,'1996-02-25'),(17,'Bernard','Paul','DefenderRight',1,'1992-08-13'),(18,'Dumas','Pierre','MidfielderLeft',1,'1994-04-05'),(19,'Roux','Alexandre','MidfielderCentreLeft',1,'1995-11-19'),(20,'Legrand','Victor','MidfielderCentreRight',1,'1993-01-30'),(21,'Sanchez','Carlos','MidfielderRight',1,'1997-03-22'),(22,'Nguyen','Jean-Pierre','StrikerLeft',1,'1990-09-11'),(23,'Durand','Michel','StrikerCentre',1,'1994-12-01'),(24,'Smith','John','Gardien',2,'1995-05-01'),(25,'Jones','Chris','DefenderLeft',2,'1994-07-14'),(26,'Williams','David','DefenderCentreLeft',2,'1993-10-20'),(27,'Taylor','Mark','DefenderCentreRight',2,'1996-02-25'),(28,'Brown','Jason','DefenderRight',2,'1992-08-13'),(29,'Davis','Ryan','MidfielderLeft',2,'1994-04-05'),(30,'Miller','Andrew','MidfielderCentreLeft',2,'1995-11-19'),(31,'Wilson','Daniel','MidfielderCentreRight',2,'1993-01-30'),(32,'Moore','Joseph','MidfielderRight',2,'1997-03-22'),(33,'Taylor','Kevin','StrikerLeft',2,'1990-09-11'),(34,'Anderson','Matthew','StrikerCentre',2,'1994-12-01');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teams`
--

LOCK TABLES `Teams` WRITE;
/*!40000 ALTER TABLE `Teams` DISABLE KEYS */;
INSERT INTO `Teams` VALUES (1,'Real Madird','Madird',1),(2,'FC Barcelone','Barcelone',2),(3,'PSG','Paris',3),(4,'Olympique Lyonnais','Lyon',17),(5,'AS Monaco U11','Monaco',19),(6,'Paris SG','Paris',20),(7,'Test Team','Test City',3),(8,'Test','Test',6),(9,'New Team','New City',1),(10,'Delete','Delete',20),(11,'DeleteDelete','DeleteDelete',16),(12,'Saint Esteve','Saint Esteve',6);
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

--
-- Table structure for table `compositions`
--

DROP TABLE IF EXISTS `compositions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compositions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `match_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `match_id` (`match_id`,`team_id`,`position`),
  KEY `team_id` (`team_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `compositions_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `Matches` (`id`),
  CONSTRAINT `compositions_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `Teams` (`Id`),
  CONSTRAINT `compositions_ibfk_3` FOREIGN KEY (`player_id`) REFERENCES `Players` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compositions`
--

LOCK TABLES `compositions` WRITE;
/*!40000 ALTER TABLE `compositions` DISABLE KEYS */;
/*!40000 ALTER TABLE `compositions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22 13:37:36
