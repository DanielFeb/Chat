package team.ziz.chat.controller.sign;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import team.ziz.chat.model.User;
import team.ziz.chat.service.IUserService;
import team.ziz.chat.utils.ISessionService;

/**
 * @author: Daniel Create Date：2016/10/16
 */
@RestController
public class SignController {
    @Autowired
    private IUserService userService;

    @Autowired
    private ISessionService sessionService;

    @RequestMapping(value = "/sign/signup", method = RequestMethod.POST)
    public int signUp(@RequestBody User user) {
        return userService.signUpUserIntoSys(user);
    }

    @RequestMapping(value = "/sign/login", method = RequestMethod.GET)
    public User login(HttpSession session) {
        User user = sessionService.getSessionUser();
        session.setAttribute(User.class.getName(), user);
        System.out.println("Session id:" + session.getId());
        User tmp = (User) session.getAttribute(User.class.getName());
        return user;
    }

}
