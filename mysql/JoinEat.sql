CREATE DATABASE IF NOT EXISTS JoinEat;
USE JoinEat;

CREATE TABLE IF NOT EXISTS `users`(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE IF NOT EXISTS `events` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) DEFAULT '',
	`shop_name` varchar(255) DEFAULT '',
	`host_id` int NOT NULL,
	`latitude` decimal NOT NULL DEFAULT 0,
	`longitude` decimal NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `appointment_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`person_limit` int NOT NULL DEFAULT 1,
	`person_joined` int NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`),
	FOREIGN KEY(`host_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `participants` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL DEFAULT 0,
	`event_id` int NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE
);
