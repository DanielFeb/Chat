-- Create user relationship table --

CREATE TABLE `UserRelation` (
  `SponsorID` int(16) NOT NULL COMMENT 'ID of sponsor',
  `FollowerID` int(16) NOT NULL COMMENT 'ID of follower',
  `RelationID` int(32) NOT NULL AUTO_INCREMENT COMMENT 'ID of the relations',
  PRIMARY KEY (`SponsorID`,`FollowerID`),
  UNIQUE KEY `RelationID_UNIQUE` (`RelationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
