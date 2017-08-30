package team.ziz.chat.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import team.ziz.chat.model.User;

/**
 * @author: Daniel Create Date：2016/10/16
 */
public interface IUserService extends UserDetailsService {
    int signUpUserIntoSys(User user);

    boolean loginToSys(int userID, String password);
}
