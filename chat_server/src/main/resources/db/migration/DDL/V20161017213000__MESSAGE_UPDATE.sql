-- Update message table --

ALTER TABLE `Message`
CHANGE COLUMN `Type` `Type` TINYINT(2) NOT NULL COMMENT 'Type of message\n0: text\n1: image\n2: radio\n3: video\n4: beFriend?' ,
CHANGE COLUMN `Status` `Status` VARCHAR(32) NOT NULL COMMENT 'Status of message\n0: new \n1: read\n2: cancel' ;
