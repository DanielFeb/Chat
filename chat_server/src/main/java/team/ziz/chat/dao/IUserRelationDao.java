package team.ziz.chat.dao;

import java.util.List;

import team.ziz.chat.model.User;

/**
 * @author: Daniel Create Date：2017/08/20
 */
public interface IUserRelationDao {
    List<User> getFriendList(int sponsorID);
}
