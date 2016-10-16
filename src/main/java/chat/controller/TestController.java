package chat.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() throws RuntimeException {
        return "Hello index!";
    }
}
