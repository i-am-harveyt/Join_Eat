CREATE DATABASE IF NOT EXISTS JoinEat;
USE JoinEat;

CREATE TABLE IF NOT EXISTS `users`(
  `id` BINARY(16) NOT NULL PRIMARY KEY,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE IF NOT EXISTS `events` (
	`id` BINARY(16) NOT NULL PRIMARY KEY,
	`host_id` BINARY(16) NOT NULL,
	`name` varchar(255) DEFAULT '',
	`shop_name` varchar(255) DEFAULT '',
	`is_public` boolean NOT NULL DEFAULT FALSE,
	`latitude` decimal NOT NULL DEFAULT 0,
	`longitude` decimal NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `appointment_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`people_limit` int NOT NULL DEFAULT 1,
	`people_joined` int NOT NULL DEFAULT 1,
	FOREIGN KEY(`host_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `participants` (
	`id` BINARY(16) NOT NULL PRIMARY KEY, -- IN MOST CASES, IT DOES NOT MATTER
	`user_id` BINARY(16) NOT NULL,
	`event_id` BINARY(16) NOT NULL,
  `join_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE KEY user_event (`user_id`, `event_id`),
	FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE
);
