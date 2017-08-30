package team.ziz.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import team.ziz.chat.dao.IUserDao;
import team.ziz.chat.model.User;
import team.ziz.chat.utils.IModelService;
import team.ziz.chat.utils.Messages;

import java.util.ArrayList;

/**
 * @author: Daniel Create Date：2016/10/14
 */
@Service
public class UserService implements IUserService {
    @Autowired
    private IUserDao userDao;

    @Autowired
    private IModelService modelService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        int userID = Integer.parseInt(username);
        if (userID <= 0) {
            throw new RuntimeException(Messages.NO_USER_LOGIN);
        }
        User user = userDao.getByID(userID);
        ArrayList<SimpleGrantedAuthority> authorizations = new ArrayList<SimpleGrantedAuthority>();
        authorizations.add(new SimpleGrantedAuthority("ROLE_GENERAL_USER"));
        user.setAuthorities(authorizations);
        return user;
    }

    @Override
    public int signUpUserIntoSys(User user) {
        modelService.replaceNullValues(user);
        userDao.create(user);
        return user.getUserID();
    }

    public boolean loginToSys(int userID, String password) {
        // if(userDao.selectPw(userID).equals(password) == true)
        // {
        // return true;
        // }else {
        // return false;
        // }
        // String pwd = userDao.selectPw(userID);
        // return pwd != null && pwd.equals(password);

        User user = userDao.getByID(userID);
        return user != null && user.getPassword().equals(password);

    }

}