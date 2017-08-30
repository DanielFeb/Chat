package team.ziz.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.ziz.chat.dao.IUserRelationDao;
import team.ziz.chat.model.User;
import team.ziz.chat.utils.ISessionService;

/**
 * @author: Daniel Create Date：2017/08/20
 */
@Service
public class UserRelationService implements IUserRelationService {
    @Autowired
    private IUserRelationDao userRelationDao;

    @Autowired
    private ISessionService sessionService;

    public List<User> getFriendList() {
        User currentUser = this.sessionService.getSessionUser();
        return this.userRelationDao.getFriendList(currentUser.getUserID());
    }
}
