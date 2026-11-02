-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: DBLOOP
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.4

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id_comment` int NOT NULL AUTO_INCREMENT,
  `date_comment` datetime NOT NULL,
  `text_comment` varchar(300) NOT NULL,
  `posts_id_post` int NOT NULL,
  `users_id_user` int NOT NULL,
  PRIMARY KEY (`id_comment`,`posts_id_post`,`users_id_user`),
  KEY `fk_comments_posts1_idx` (`posts_id_post`),
  KEY `fk_comments_users1_idx` (`users_id_user`),
  CONSTRAINT `fk_comments_posts1` FOREIGN KEY (`posts_id_post`) REFERENCES `posts` (`id_post`),
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`users_id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id_comment`, `date_comment`, `text_comment`, `posts_id_post`, `users_id_user`) VALUES (1,'2026-10-01 11:00:00','¡Excelente iniciativa Víctor! Java 21 trae mejoras de rendimiento increíbles.',1,3),(2,'2026-10-02 13:15:00','Totalmente de acuerdo con el enfoque minimalista, Karen.',2,4),(3,'2026-10-03 16:10:00','Muy buenos tips Ángel, los aplicaré en el próximo sprint.',3,1),(4,'2026-10-04 10:30:00','La comunicación asíncrona es clave para esto. Gran aporte Angélica.',4,6),(5,'2026-10-05 18:00:00','Excelente manejo de contenedores, Álvaro. ¿Usáis Kubernetes en producción?',5,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id_post` int NOT NULL AUTO_INCREMENT,
  `resume_description` varchar(100) NOT NULL,
  `text` longtext NOT NULL,
  `users_id_user` int NOT NULL,
  `labels` varchar(30) NOT NULL,
  `likes` int DEFAULT NULL,
  `date_post` datetime NOT NULL,
  `img_post` varchar(200) DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_post`,`users_id_user`),
  KEY `fk_posts_users_idx` (`users_id_user`),
  CONSTRAINT `fk_posts_users` FOREIGN KEY (`users_id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id_post`, `resume_description`, `text`, `users_id_user`, `labels`, `likes`, `date_post`, `img_post`, `link`) VALUES (1,'Lanzamiento de mi nuevo proyecto backend','Hoy estamos liberando la nueva arquitectura de microservicios basada en Java 21 y Spring Boot.',1,'Java,Backend',15,'2026-10-01 10:30:00','https://images.example.com/posts/java.jpg','https://github.com/v_lazaro/project'),(2,'Nuevas tendencias de diseño en 2026','El diseño minimalista y el modo oscuro siguen dominando las interfaces de usuario móviles este año.',2,'UIUX,Design',28,'2026-10-02 12:00:00','https://images.example.com/posts/ui.jpg','https://dibe.co/trends'),(3,'Optimizando rendimiento con React','Compartiendo algunos consejos prácticos para reducir renders innecesarios en aplicaciones grandes.',3,'React,Frontend',42,'2026-10-03 15:45:00',NULL,'https://dev.to/angel_dev/react-tips'),(4,'Gestión de equipos ágiles remotos','Claves fundamentales para mantener la comunicación fluida y la productividad en equipos de desarrollo distribuidos.',4,'Agile,Management',19,'2026-10-04 09:00:00','https://images.example.com/posts/agile.jpg',NULL),(5,'Automatización con Docker y CI/CD','Automatizar los despliegues nos ahorra horas de errores humanos en producción. Aquí un caso de éxito.',5,'DevOps,Docker',35,'2026-10-05 17:20:00',NULL,'https://medium.com/@alvaro_ops/cicd');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id_profile` int NOT NULL AUTO_INCREMENT,
  `img_profile` varchar(2050) DEFAULT NULL,
  `biography` varchar(300) NOT NULL,
  `occupation` varchar(45) NOT NULL,
  `skills` varchar(150) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id_profile`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` (`id_profile`, `img_profile`, `biography`, `occupation`, `skills`, `create_date`) VALUES (1,'https://images.example.com/profiles/victor.jpg','Software Engineer apasionado por el desarrollo backend y Java.','Software Engineer','Java, Spring Boot, MySQL, Git','2026-01-15 10:00:00'),(2,'https://images.example.com/profiles/karen.jpg','Diseñadora UI/UX enfocada en experiencias de usuario accesibles.','UI/UX Designer','Figma, Adobe XD, HTML, CSS','2026-02-10 11:30:00'),(3,'https://images.example.com/profiles/angel.jpg','Desarrollador Frontend con experiencia en frameworks modernos.','Frontend Developer','JavaScript, React, Tailwind, TypeScript','2026-03-05 09:15:00'),(4,'https://images.example.com/profiles/angelica.jpg','Especialista en gestión de proyectos tecnológicos y metodologías ágiles.','Project Manager','Scrum, Jira, Agile, Liderazgo','2026-03-20 14:20:00'),(5,'https://images.example.com/profiles/alvaro.jpg','Ingeniero DevOps optimizando pipelines de integración continua.','DevOps Engineer','Docker, Kubernetes, AWS, CI/CD','2026-04-01 08:45:00'),(6,'https://images.example.com/profiles/efrain.jpg','Administrador de bases de datos y seguridad informática.','Database Administrator','MySQL, PostgreSQL, Seguridad, Linux','2026-04-12 16:00:00');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(45) NOT NULL,
  `profile_id_profile` int NOT NULL,
  PRIMARY KEY (`id_user`,`profile_id_profile`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_users_profile1_idx` (`profile_id_profile`),
  CONSTRAINT `fk_users_profile1` FOREIGN KEY (`profile_id_profile`) REFERENCES `profile` (`id_profile`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `username`, `email`, `phone`, `password`, `profile_id_profile`) VALUES (1,'Víctor','Lázaro','v_lazaro','victor.lazaro@example.com','+34600112233','pass1234',1),(2,'Karen','Gómez','karen_ux','karen.gomez@example.com','+34600223344','pass1234',2),(3,'Ángel','Torres','angel_dev','angel.torres@example.com','+34600334455','pass1234',3),(4,'Angélica','Rojas','angelica_pm','angelica.rojas@example.com','+34600445566','pass1234',4),(5,'Álvaro','Martín','alvaro_ops','alvaro.martin@example.com','+34600556677','pass1234',5),(6,'Efraín','Blanco','efrain_dba','efrain.blanco@example.com','+34600667788','pass1234',6);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'DBLOOP'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-27 17:28:42
