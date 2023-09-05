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
-- Table structure for table `pauta_diaria`
--

DROP TABLE IF EXISTS `pauta_diaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pauta_diaria` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Fecha` varchar(45) NOT NULL,
  `Cuadrilla` varchar(45) NOT NULL,
  `Descripcion` longtext NOT NULL,
  `Ubicacion` varchar(45) NOT NULL,
  `Supervisor` varchar(45) NOT NULL,
  `Mantenedor` longtext NOT NULL,
  `Turno` varchar(45) NOT NULL,
  `Instructivo` longtext NOT NULL,
  `Telefono` varchar(45) NOT NULL,
  `Frecuenciaradio` varchar(45) NOT NULL,
  `Dotacion` varchar(45) NOT NULL,
  `Herramientas` longtext NOT NULL,
  `Auspervac` longtext,
  `Area` varchar(45) DEFAULT NULL,
  `Coordinador` varchar(45) DEFAULT NULL,
  `Apr` varchar(45) DEFAULT NULL,
  `Idingreso` varchar(45) DEFAULT NULL,
  `Seleccionado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pauta_diaria`
--

LOCK TABLES `pauta_diaria` WRITE;
/*!40000 ALTER TABLE `pauta_diaria` DISABLE KEYS */;
INSERT INTO `pauta_diaria` VALUES (48,'18-05-2023','Mantenimiento Buzones','Inspeccion Buzones','Buzon Norte/Sur\r\n','R. Molina','M. Castillo, R. Ulloa, C. Salazar','H','PO-BUZ-06-08, PO-BUZ-06-01','940319271','TTE 5 NORTE','4','Paños de limpieza, juego de llaves punta y corona , aceitera manual, Multitester digital, Atornilladores diferentes medidas, Huincha Medir','Michael Navarro LM','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','cb0a47dd-62fc-744d-2f7a-4abe6d931b6e','1'),(49,'18-05-2023','Señales/Infra','Revision MC 118','MC 118','Miguel Delgado','B. Otarola, J. Seron, N. Lopez','A1','PO-AUT-06-06, PO-AUT-06-01, PO-INFRA-06-01','996855294','TTE 5 NORTE','4','Alicate universal, alicate de punta, alicate cortante, juegos de perilleros, juego de atornilladores, computador portátil, multitester juego de dados y llaves punta corona, maquina de soldar, esmeril angular, taladro eléctrico, brocas discos de corte y desbaste 4 1/2\"','Michael Navarro LM','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','cb0a47dd-62fc-744d-2f7a-4abe6d931b6e','0'),(50,'18-05-2023','Mantencion Vías',' Traslado y cambio de tablones de piso en Puente ','Sector Puente','Manuel Hurtado','P. Henriquez, L. Muñoz, C. Carrasco, F. Diaz, A. Perez, I. Espinoza, F. Llanca, D. Fuenzalioda','H','PO-ENRI-06-32, PO-ENRI-06-01, PO-ENRI-06-35','974776547','TTE 5 NORTE','9','Martillo enrielador, llaves enrieladora, martillo peña, paños limpieza, llaves stilson, equipo oxicorte ','J. Gauna (vacaciones)\r\n','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','cb0a47dd-62fc-744d-2f7a-4abe6d931b6e','0'),(51,'18-05-2023','Mantencion Loco/Carros','Cambio de baterias  Locomotora 301\r\nCambio de baterias  Locomotora 304\r\n\r\n\r\n\r\nHabilitar Circuito Alumbrado Pala 503','Taller electrico','Secundino Duque','A. Cavieres, C. Fuenzalida, J. Lagos, S. Ojeda, J. Diaz, R. Cerda','A','PO-TA-06-00, PO-GEN-06-11, PO-CAME-6-05, PO-GEN-06-01, PO-GEN-06-02, PO-GEN-06-03, PO-GEN-06-04','957380387','TTE 5 NORTE','7','Escobilla de acero, espátulas, brochas, alicate universal, alicate de punta, alicate cortante, martillo de peña, llaves allens, llaves punta corona, juegos de dados, botadores, punto centro, cincel, equipo de oxicorte, maquina de soldar, esmeril angular, taladro manual ','J. Gauna (vacaciones)\r\n','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','cb0a47dd-62fc-744d-2f7a-4abe6d931b6e','0'),(52,'18-05-2023','Mantención Loco/ Carros ','Cambio de baterias  Locomotora 301\r\nCambio de baterias  Locomotora 304\r\n\r\n\r\n\r\nHabilitar Circuito Alumbrado Pala 503','Taller electrico','Secundino Duque','J. Lagos, B. Otarola, J. P. Gonzalez, A. Cavieres','H','PO-LOC33T-06-05, PO-LOC33T-06-01, PO-LOC33T-06-06','995774988','TTE 5 NORTE','0','Alicate universal, alicate de punta, alicate cortante, juegos de perilleros, juego de atornilladores, computador portátil, multitester juego de dados y llaves punta corona, maquina de soldar, esmeril angular, taladro eléctrico, brocas discos de corte ','J. Gauna (vacaciones)\r\n','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','cb0a47dd-62fc-744d-2f7a-4abe6d931b6e','0'),(53,'18-05-2023','SPOT','Fabricacion barrera dura','Cancha 6','Fernando Ramirez','M. Canales, Fernando Herrera, L. Espinoza, R. Riquelme, Claudio Reyes','H','PO-INFRA-06-07','56962458285','DOTACION TOTAL','31','Alicate universal, alicate de punta, alicate cortante, juegos de perilleros, juego de atornilladores, computador portátil, multitester juego de dados y llaves punta corona, maquina de soldar, esmeril angular, taladro eléctrico, brocas discos de corte ','Pablo Paiva (examen)\r\nCarlos Cortes (curso)\r\nIgnacio González (curso)\r\nR. Alvarado (curso)','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','cb0a47dd-62fc-744d-2f7a-4abe6d931b6e','0'),(54,'24-05-2023','Mantenimiento Buzones','Mantenimiento diario semanal de Buzón Norte y Sur\r\nMantenimiento trimestral Unidad Hidraulica Buzon Norte 531','Buzon Norte/Sur\r\n','R. Molina','M. Castillo, C. Salazar','H','PO-BUZ-06-08, PO-BUZ-06-01','940319271','TTE 5 NORTE','3','Paños de limpieza, juego de llaves punta y corona , aceitera manual, Multitester digital, Atornilladores diferentes medidas, Huincha Medir','Michael Navarro LM\r\nR. Ulloa LM','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','833bd717-d9e5-cc9e-5255-4ec74a7fe9f4','0'),(55,'24-05-2023','Señales/Infra','Alumbrado Sector Derecha Arriba MC 118','MC 118','Juan P. Fernandez','P. Ruiz, P. Ibarra','A1','PO-AUT-06-06, PO-AUT-06-01, PO-INFRA-06-01','996855294','TTE 5 NORTE','3','Alicate universal, alicate de punta, alicate cortante, juegos de perilleros, juego de atornilladores, computador portátil, multitester juego de dados y llaves punta corona, maquina de soldar, esmeril angular, taladro eléctrico, brocas discos de corte y desbaste 4 1/2\"','Michael Navarro LM\r\nR. Ulloa LM','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','833bd717-d9e5-cc9e-5255-4ec74a7fe9f4','0'),(56,'24-05-2023','Mantencion Vías','Cambio de barras lado contrario maquinista en sector 60 1/2','Tunel Nuevo','Manuel Hurtado','P. Henriquez, L. Muñoz, C. Carrasco, F. Diaz, A. Perez, I. Espinoza, F. Llanca, D. Fuenzalioda','H','PO-ENRI-06-32, PO-ENRI-06-01, PO-ENRI-06-35','974776547','TTE 5 NORTE','9','Martillo enrielador, llaves enrieladora, martillo peña, paños limpieza, llaves stilson, equipo oxicorte ','J. Gauna (vacaciones)\r\n','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','833bd717-d9e5-cc9e-5255-4ec74a7fe9f4','0'),(57,'24-05-2023','Mantencion Loco/Carros','Mantenimiento Semestral Carro 213','Taller Electrico','R. Lizama','J. Morales, G. Trujilllo, H.  Lara','A','PO-TA-06-00, PO-GEN-06-11, PO-CAME-6-05, PO-GEN-06-01, PO-GEN-06-02, PO-GEN-06-03, PO-GEN-06-04','957380387','TTE 5 NORTE','4','Escobilla de acero, espátulas, brochas, alicate universal, alicate de punta, alicate cortante, martillo de peña, llaves allens, llaves punta corona, juegos de dados, botadores, punto centro, cincel, equipo de oxicorte, maquina de soldar, esmeril angular, taladro manual ','B. Otarola (Permiso sin Goce)\r\nJ. Seron (Permiso sin Goce)','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','833bd717-d9e5-cc9e-5255-4ec74a7fe9f4','1'),(58,'24-05-2023','SPOT','Preparativos y traslado de componentes estructura caverna planta chancado','Planta Chancado','Fernando Herrera','M. Canales, Fernando Ramirez, L. Espinoza, R. Riquelme, Claudio Reyes, Pablo Paiva, Carlos Cortes, Ignacio González, R. Alvarado ','H','PO-INFRA-06-07','56962458285','DOTACION TOTAL','33','Alicate universal, alicate de punta, alicate cortante, juegos de perilleros, juego de atornilladores, computador portátil, multitester juego de dados y llaves punta corona, maquina de soldar, esmeril angular, taladro eléctrico, brocas discos de corte ','B. Otarola (Permiso sin Goce)\r\nJ. Seron (Permiso sin Goce)','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','833bd717-d9e5-cc9e-5255-4ec74a7fe9f4','0'),(59,'24-05-2023','Mantención Loco/ Carros ','Mantenimiento Trimestral Locomotora 312','Pozo Linea 5','R. Lizama','J. Lagos, A. Cavieres','H','PO-LOC33T-06-05, PO-LOC33T-06-01, PO-LOC33T-06-06','995774988','TTE 5 NORTE','3','Alicate universal, alicate de punta, alicate cortante, juegos de perilleros, juego de atornilladores, computador portátil, multitester juego de dados y llaves punta corona, maquina de soldar, esmeril angular, taladro eléctrico, brocas discos de corte ','B. Otarola (Permiso sin Goce)\r\nJ. Seron (Permiso sin Goce)','PUNTA RIELES','CLAUDIO VASQUEZ/MIGUEL DELGADO','FERNANDO CONTRERAS','833bd717-d9e5-cc9e-5255-4ec74a7fe9f4','0');
/*!40000 ALTER TABLE `pauta_diaria` ENABLE KEYS */;
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

-- Dump completed on 2023-09-05 11:28:17
