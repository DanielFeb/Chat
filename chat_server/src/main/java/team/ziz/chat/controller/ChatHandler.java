package team.ziz.chat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import team.ziz.chat.model.Message;
import team.ziz.chat.utils.JsonConverter;
import team.ziz.chat.utils.SessionService;

import java.io.IOException;
import java.util.HashMap;

@Component
public class ChatHandler implements WebSocketHandler {
    @Autowired
    private SessionService sessionService;
    private Logger log = LoggerFactory.getLogger(ChatHandler.class);

    private static final int SYSTEM_ID = -1;

    private static final HashMap<Integer, WebSocketSession> users = new HashMap<Integer, WebSocketSession>();

    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("ConnectionEstablished");
        log.debug("ConnectionEstablished");
        sessionService.isUserLoggedIn();
        Integer id = users.size();
        users.put(id, session);
        String sessionId = session.getId();
        String msg = "connect, your id is " + id + ", and your session id is" + sessionId + " .";

        this.sendMessage(new Message(SYSTEM_ID, id.intValue(), msg));
    }

    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // Class cls = message.getPayload().getClass();
        String json = message.getPayload().toString();
        System.out.println("handleMessage" + json);
        log.debug("handleMessage" + json);
        // sendMessageToUsers();
        this.sendMessage(this.dewrapMessage(json));
    }

    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
        users.remove(session);

        log.debug("handleTransportError" + exception.getMessage());
    }

    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        users.remove(session);
        log.debug("afterConnectionClosed" + closeStatus.getReason());

    }

    public boolean supportsPartialMessages() {
        return false;
    }

    /**
     * send message to user
     *
     * @param message
     */
    public void sendMessage(Message message) {
        WebSocketSession session = users.get(message.getRecieveUserID());
        try {
            if (session.isOpen()) {
                session.sendMessage(this.wrapMessage(message));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private Message dewrapMessage(String json) {
        Message msg = JsonConverter.JsonToObject(json, Message.class);
        return msg;
    }

    private TextMessage wrapMessage(Message message) {
        String json = JsonConverter.ObjectToJson(message);
        if (json == null) {
            // TODO:error Message
            json = "internal server error!";
        }
        return new TextMessage(json);
    }
}
