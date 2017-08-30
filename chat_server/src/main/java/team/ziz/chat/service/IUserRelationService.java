package team.ziz.chat.service;

import java.util.List;

import team.ziz.chat.model.User;

public interface IUserRelationService {
    List<User> getFriendList();
}
