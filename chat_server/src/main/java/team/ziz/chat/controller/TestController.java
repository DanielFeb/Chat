package team.ziz.chat.controller;

import org.springframework.web.bind.annotation.*;

import team.ziz.chat.model.User;

/**
 * @author: Daniel Create Date：2016/10/16
 */
@RestController
public class TestController {
    @RequestMapping(value = "/greet", method = RequestMethod.GET)
    public String greet(@RequestParam String username) {
        return "Hello " + username + "!";
    }

    @RequestMapping(value = "/testCredential", method = RequestMethod.GET)
    public String testCredential() {
        return "Hello credential!";
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
