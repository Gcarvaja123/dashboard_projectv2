-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: db-mysql-nyc1-97835-do-user-13271095-0.b.db.ondigitalocean.com    Database: trabajo
-- ------------------------------------------------------
-- Server version	8.0.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '1b967ddc-24b1-11ee-9be3-5a7b485fd292:1-16291,
da0b3eb3-c762-11ed-aed5-2a1cc923a0df:1-47036';

--
-- Table structure for table `workpad`
--

DROP TABLE IF EXISTS `workpad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workpad` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(45) DEFAULT NULL,
  `Actividad` varchar(45) DEFAULT NULL,
  `Ejecutor` varchar(45) DEFAULT NULL,
  `HrsProg` varchar(45) DEFAULT NULL,
  `LunesTa` varchar(45) DEFAULT NULL,
  `LunesTb` varchar(45) DEFAULT NULL,
  `MartesTa` varchar(45) DEFAULT NULL,
  `MartesTb` varchar(45) DEFAULT NULL,
  `MiercolesTa` varchar(45) DEFAULT NULL,
  `MiercolesTb` varchar(45) DEFAULT NULL,
  `JuevesTa` varchar(45) DEFAULT NULL,
  `JuevesTb` varchar(45) DEFAULT NULL,
  `ViernesTa` varchar(45) DEFAULT NULL,
  `ViernesTb` varchar(45) DEFAULT NULL,
  `SabadoTa` varchar(45) DEFAULT NULL,
  `SabadoTb` varchar(45) DEFAULT NULL,
  `DomingoTa` varchar(45) DEFAULT NULL,
  `DomingoTb` varchar(45) DEFAULT NULL,
  `Aviso` varchar(45) DEFAULT NULL,
  `Orden` varchar(45) DEFAULT NULL,
  `Idingreso` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workpad`
--

LOCK TABLES `workpad` WRITE;
/*!40000 ALTER TABLE `workpad` DISABLE KEYS */;
INSERT INTO `workpad` VALUES (187,'LOCO','MANT TRIMESTRAL LOCO 306 CHESTA','MIES','45','7.5','7.5','7.5','7.5','7.5','7.5','','','','','','','','','','106150404','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(188,'LOCO','MANT MENSUAL LOCO 309 GE','MIES','35','0','0','0','0','0','0','7','7','7','7','7','','','','','106150408','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(189,'LOCO','MANT MENSUAL LOCO 311CHESTA','MIES','35','0','0','0','0','0','0','0','0','0','7','7','7','7','7','','106150411','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(190,'CARROS','MANT. PL CARRO MET.  # 275 25 Ton.','MIES','37','0','0','7.4','7.4','7.4','7.4','7.4','0','0','0','0','0','0','0','','106150506','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(191,'CARROS','MANT. PL CARRO MET.  # 277 25 Ton.','MIES','37','0','0','0','0','0','0','0','0','0','7.4','7.4','7.4','7.4','7.4','','105843060','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(192,'LIMPIA VIAS','506 LIMPIA VIA - ELVI','MIES','6','0','0','0','0','6','0','0','0','0','0','0','0','0','0','','106150415','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(193,'IRWIN','413 IRWIN','MIES','6','0','0','0','0','6','0','0','0','0','0','0','0','0','0','','106150496','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(194,'ALUMBRADO','Señal Incendio','MIES','8','0','0','0','8','0','0','0','0','0','0','0','0','0','0','','106149935','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(195,'ALUMBRADO','Talleres','MIES','8','0','0','0','0','0','0','0','8','0','0','0','0','0','0','','106150160','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(196,'ALUMBRADO',' CAMBIO 115','MIES','6','6','0','0','0','0','0','0','0','0','0','0','0','0','0','','106150174','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(197,'ALUMBRADO',' CAMBIO 118','MIES','6','0','0','6','0','0','0','0','0','0','0','0','0','0','0','','106234382','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(198,'ALUMBRADO','DESVIO ARRIBA, HW','MIES','6','0','0','0','0','6','0','0','0','0','0','0','0','0','0','','106150259','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(199,'ALUMBRADO','. UR-7 SEÑA','MIES','6','0','0','0','0','0','0','6','0','0','0','0','0','0','0','','106150267','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(200,'ALUMBRADO','LOCALIDADES SECTOR PIQUE B','MIES','6','0','0','0','0','0','0','0','0','6','0','0','0','0','0','','106150274','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(201,'ALUMBRADO','CONSOLA OPERACIÓN Nº 1','MIES','6','0','0','0','0','0','0','0','6','0','0','0','0','0','0','','106150300','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(202,'VIAS DE FFFCC',' CAMBIO 115','MIES','6','6','0','0','0','0','0','0','0','0','0','0','0','0','0','','106150174','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(203,'VIAS DE FFFCC',' CAMBIO 118','MIES','6','0','0','6','0','0','0','0','0','0','0','0','0','0','0','','106234382','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(204,'VIAS DE FFFCC','DESDE 2AS HASTA TOLVA OP 12-13','MIES','6','0','0','0','0','6','0','0','0','0','0','0','0','0','0','','106150309','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(205,'BUZONES','MTTO. DIARIO-SEMANAL Buzón Pique Norte','MIES','10','2','0','2','0','2','0','2','0','2','0','0','0','0','0','','106085232','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(206,'BUZONES','Pauta Estructural Quincenal Buzón 531','MIES','2','0','0','0','0','2','0','0','0','0','0','0','0','0','0','','106150362','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(207,'BUZONES','MTTO. DIARIO-SEMANAL Buzón Pique Sur','MIES','10','2','0','2','0','2','0','2','0','2','0','0','0','0','0','','106150371','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(208,'BUZONES','Pauta Estructural Quincenal Buzón 532','MIES','2','0','0','0','0','0','0','2','0','0','0','0','0','0','0','','106150374','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(209,'TROLLEY','Lín. 4 hasta el 60 1/2','MIES','6','0','0','6','0','0','0','0','0','0','0','0','0','0','0','','106150166','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb'),(210,'TROLLEY','OP-13 hasta Tolva OP-12','MIES','6','0','0','0','0','0','0','0','0','6','0','0','0','0','0','','106150170','80beba6a-1b1d-2fd2-fc78-2b7a20ac1dfb');
/*!40000 ALTER TABLE `workpad` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-05 11:28:12
