package team.ziz.chat.dao;

import team.ziz.chat.model.User;

/**
 * @author: Daniel Create Date：2016/10/16
 */
public interface IUserDao {

    int create(User user);

    User getByID(int userID);

    String selectPw(int userID);
}
