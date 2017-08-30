INSERT INTO `User` (`UserID`, `Nickname`, `Password`, `IconUrl`, `RealName`, `Phone`, `Address`, `Email`) VALUES ('1', 'Daniel', 'Xqf123123', '/1/photo.png', 'Xu Qing Feng', '18964526951', 'Shang Hai', '645232436@qq.com');
INSERT INTO `User` (`UserID`, `Nickname`, `Password`, `IconUrl`, `RealName`, `Phone`, `Address`, `Email`) VALUES ('2', 'Ziz', 'Ziz123123', '/2/photo.png', 'Li Mei Hui', '18964526952', 'Shang Hai', '759438338@qq.com');
INSERT INTO `User` (`UserID`, `Nickname`, `Password`, `IconUrl`, `RealName`, `Phone`, `Address`, `Email`) VALUES ('3', 'Nobody', 'Nob123123', '/3/photo.png', 'No Body', '18964526953', 'Shang Hai', '759438337@qq.com');
INSERT INTO `UserRelation` (`SponsorID`, `FollowerID`, `RelationID`) VALUES ('1', '2', '1');
INSERT INTO `UserRelation` (`SponsorID`, `FollowerID`, `RelationID`) VALUES ('1', '3', '2');
INSERT INTO `UserRelation` (`SponsorID`, `FollowerID`, `RelationID`) VALUES ('2', '1', '3');
