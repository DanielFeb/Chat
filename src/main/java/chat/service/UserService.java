package chat.service;

import chat.dao.IUserDao;
import chat.model.User;
import chat.utils.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author: Daniel
 * Create Date：2016/10/14
 */
@Service
public class UserService implements IUserService {
    @Autowired
    private IUserDao userDao;

    @Autowired
    private ModelService modelService;

    @Override
    public int signUpUserIntoSys(User user) {
        modelService.replaceNullValues(user);
        userDao.create(user);
        return user.getUserID();
    }

}
