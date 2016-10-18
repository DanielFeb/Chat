package chat.service;

import chat.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @author: Daniel
 * Create Date：2016/10/16
 */
public interface IUserService extends UserDetailsService {
    int signUpUserIntoSys(User user);

    boolean loginToSys(int userID, String password);
}
