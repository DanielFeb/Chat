-- Create user relationship table --

CREATE TABLE `UserRelation` (
  `SponsorCode` int(16) NOT NULL COMMENT 'ID of sponsor',
  `FollowerCode` int(16) NOT NULL COMMENT 'ID of follower',
  `GroupInfo` varchar(45) NOT NULL COMMENT 'information of group',
  `RelationID` int(32) NOT NULL AUTO_INCREMENT COMMENT 'ID of the relations',
  PRIMARY KEY (`SponsorCode`,`FollowerCode`),
  UNIQUE KEY `RelationID_UNIQUE` (`RelationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
