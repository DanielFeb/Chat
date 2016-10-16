package chat.controller.sign;

import chat.model.User;
import chat.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: Daniel
 * Create Date：2016/10/16
 */
@RestController
public class SignController {
    @Autowired
    private IUserService userService;

    @RequestMapping(value = "/sign/signup", method = RequestMethod.POST)
    public int signUp(@RequestBody User user){
        return userService.signUpUserIntoSys(user);
    }
}
