package chat.utils;

import chat.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author: Daniel
 * Create Date：2016/10/18
 */
@Service
public class SessionService implements ISessionService{
    @Override
    public User getSessionUser() {
        User currentUser;
        try {
            Object tmp = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            currentUser = (User) tmp;
            currentUser.setPassword("none");
        }catch(Exception e) {
            throw new RuntimeException(Messages.NO_USER_LOGIN);
        }
        return currentUser;
    }
}
