package chat.controller.sign;

import chat.model.User;
import chat.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author: Daniel
 * Create Date：2016/10/16
 */
@RestController
public class SignController {
    @Autowired
    private IUserService userService;

    @RequestMapping(value = "/sign/signup", method = RequestMethod.POST)
    public int signUp(@RequestBody User user)
    {
        return userService.signUpUserIntoSys(user);
    }

    @RequestMapping(value = "/sign/login", method = RequestMethod.GET)
    public boolean login(@RequestParam int userID, @RequestParam String password)
    {
        return userService.loginToSys(userID, password);
    }

}
