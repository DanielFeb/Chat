package team.ziz.chatmin.socket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
   public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
       registry.addHandler(myHandler(), "/minchat").setAllowedOrigins("http://127.0.0.1");

       registry.addHandler(myHandler(), "/minchat/sockjs").setAllowedOrigins("http://127.0.0.1").withSockJS();
   }

   public WebSocketHandler myHandler() {
      return new ChatHandler();
   }

}
