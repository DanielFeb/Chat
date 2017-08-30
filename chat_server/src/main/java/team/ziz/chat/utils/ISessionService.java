package team.ziz.chat.utils;

import team.ziz.chat.model.User;

/**
 * @author: Daniel Create Date：2016/10/18
 */
public interface ISessionService {
    User getSessionUser();

    boolean isUserLoggedIn();
}
