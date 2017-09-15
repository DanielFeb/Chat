package team.ziz.chat.controller.relation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import team.ziz.chat.model.User;
import team.ziz.chat.service.IUserRelationService;
import team.ziz.chat.utils.ISessionService;

/**
 * Created by Darren on 16/10/17.
 */

@RestController
public class UserRelationController {

    @Autowired
    private IUserRelationService userRelationService;

    @Autowired
    private ISessionService sessionService;

    @GetMapping("/relation/friend-list")
    public List<User> getFriendList() {
        if (!this.sessionService.isUserLoggedIn()){
            return null;
        }
        List<User> friends = this.userRelationService.getFriendList();
        // hard code, add system
        User sysUser = new User();
        sysUser.setUserID(-1);
        sysUser.setNickname("System");
        friends.add(0, sysUser);
        return friends;
    }
}
