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


INSERT INTO `lables` VALUES (64,'label1','#f8e71c'),(65,'Lable2','#7ed321');

INSERT INTO `todo_list` VALUES (55,'List1');
