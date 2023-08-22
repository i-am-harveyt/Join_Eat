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
`latitude` decimal(9, 6) NOT NULL DEFAULT 0,
`longitude` decimal(9, 6) NOT NULL DEFAULT 0,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`appointment_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`people_limit` int NOT NULL DEFAULT 1,
`people_joined` int NOT NULL DEFAULT 1,
`status` boolean DEFAULT FALSE,
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

-- checking people limit may be exceed or not
DELIMITER //
CREATE TRIGGER IF NOT EXISTS check_people_limit
BEFORE UPDATE ON events FOR EACH ROW
BEGIN
	IF NEW.people_joined > NEW.people_limit THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'People joined will exceed people limit';
	END IF;
END;
//

CREATE TRIGGER IF NOT EXISTS check_host_quit
BEFORE DELETE ON participants FOR EACH ROW
BEGIN
	DECLARE event_host_id BINARY(16);
	SELECT host_id INTO event_host_id
	FROM events WHERE id=OLD.event_id;
	IF OLD.user_id = event_host_id THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Host cannot quite the event';
	END IF;
END
//

-- update people joined
CREATE PROCEDURE IF NOT EXISTS UpdatePeopleJoined(event_id BINARY(16), increment INT)
BEGIN
	UPDATE events SET people_joined = people_joined + increment
	WHERE id = event_id;
END;
//
CREATE TRIGGER IF NOT EXISTS add_people_joined
AFTER INSERT ON participants FOR EACH ROW
BEGIN
	CALL UpdatePeopleJoined(NEW.event_id, 1);
END;
//
CREATE TRIGGER IF NOT EXISTS dec_people_joined
AFTER DELETE ON participants FOR EACH ROW
BEGIN
	CALL UpdatePeopleJoined(OLD.event_id, -1);
END;
//

-- check_expired_events
CREATE EVENT IF NOT EXISTS check_expired_events
ON SCHEDULE EVERY 1 MINUTE
DO
  BEGIN
    UPDATE events
    SET status = TRUE
    WHERE appointment_time < DATE_ADD(NOW(), INTERVAL 8 HOUR);
  END;
//
DELIMITER ;
