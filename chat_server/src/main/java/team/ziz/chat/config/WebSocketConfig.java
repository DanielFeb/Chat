package team.ziz.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import team.ziz.chat.controller.ChatHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
   public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
       registry.addHandler(myHandler(), "/minchat")
           .addInterceptors(new HttpSessionHandshakeInterceptor())
           .setAllowedOrigins("*");

       registry.addHandler(myHandler(), "/minchat/sockjs")
           .addInterceptors(new HttpSessionHandshakeInterceptor())
           .setAllowedOrigins("*")
           .withSockJS();
   }

   public WebSocketHandler myHandler() {
      return new ChatHandler();
   }

}
