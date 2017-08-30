-- Create message table --

CREATE TABLE `Message` (
  `MessageID` int(32) NOT NULL AUTO_INCREMENT COMMENT 'ID of message',
  `SenderCode` int(16) NOT NULL COMMENT 'ID of sender',
  `RecieverCode` int(16) NOT NULL COMMENT 'ID of reciever',
  `SendTime` datetime NOT NULL COMMENT 'Time when sending',
  `ReadTime` datetime NOT NULL COMMENT 'Time when reading',
  `Type` tinyint(2) NOT NULL COMMENT 'Type of message',
  `Status` varchar(32) NOT NULL COMMENT 'Status of message',
  `Content` varchar(255) NOT NULL COMMENT 'Content of message',
  PRIMARY KEY (`MessageID`),
  UNIQUE KEY `MessageID_UNIQUE` (`MessageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
