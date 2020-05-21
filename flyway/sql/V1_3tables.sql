

--
-- Table structure for table `lables`
--

CREATE TABLE `lables` (
  `lable_id` int(11) NOT NULL AUTO_INCREMENT,
  `lable_name` varchar(255) NOT NULL,
  `lable_color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4;



CREATE TABLE `todo_list` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;




CREATE TABLE `todo` (
  `todo_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `list_id` int(11) NOT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `todo_list` (`list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


