package team.ziz.chat;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author: Daniel Create Date: 2016/10/14
 */
@SpringBootApplication
@MapperScan("team.ziz.chat.dao")
public class ChatServer {
    public static void main(String[] args) {
        SpringApplication.run(ChatServer.class, args);
    }
}
