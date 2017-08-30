-- Create user information table --

CREATE TABLE `User` (
  `UserID` int(32) NOT NULL AUTO_INCREMENT COMMENT 'Inner unique ID of user ',
  `Nickname` varchar(20) NOT NULL COMMENT 'Nickname of user',
  `Password` varchar(16) NOT NULL COMMENT 'Password of user',
  `IconUrl` varchar(45) NOT NULL COMMENT 'Url of icon',
  `RealName` varchar(45) NOT NULL COMMENT 'User`s name',
  `Phone` varchar(16) NOT NULL COMMENT 'telephone number of user',
  `Address` varchar(45) NOT NULL COMMENT 'Address of user',
  `Email` varchar(45) NOT NULL COMMENT 'Email of user',
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
