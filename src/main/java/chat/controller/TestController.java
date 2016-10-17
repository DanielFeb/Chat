package chat.controller;

import chat.model.User;
import org.springframework.web.bind.annotation.*;

/**
 * @author: Daniel
 * Create Date：2016/10/16
 */
@RestController
public class TestController {
    @RequestMapping(value = "/greet",method = RequestMethod.GET)
    public String greet(@RequestParam String username){
        return "Hello " + username + "!";
    }

    @RequestMapping(value = "/post", method = RequestMethod.POST)
    public String postMsg(@RequestBody User user) throws RuntimeException {
        return "Hello " + user.getNickname() + "!";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() throws RuntimeException {
        return "Hello index!";
    }
}
