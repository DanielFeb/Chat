package team.ziz.chat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import team.ziz.chat.model.Message;
import team.ziz.chat.model.User;
import team.ziz.chat.utils.JsonConverter;

import java.io.IOException;
import java.sql.Date;
import java.util.Calendar;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

@Component
public class ChatHandler implements WebSocketHandler {
    private Logger log = LoggerFactory.getLogger(ChatHandler.class);

    private static final int SYSTEM_ID = -1;

    private static final HashMap<Integer, WebSocketSession> users = new HashMap<Integer, WebSocketSession>();

    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("ConnectionEstablished");
        User currentUser = getSessionUser(session);
        if (currentUser == null) {
            System.out.println("User is null!");
            return;
        } 
        Integer id = currentUser.getUserID();
        users.put(id, session);
        String sessionId = session.getId();
        String msg = "Connectted, your id is " + id + ", and your session id is" + sessionId + " .";

        this.sendMessage(new Message(SYSTEM_ID, id.intValue(), msg, Calendar.getInstance().getTime().getTime()));
    }

    public void handleMessage(WebSocketSession session, WebSocketMessage<?> rawMessage) throws Exception {
        String json = rawMessage.getPayload().toString();
        System.out.println("handleMessage" + json);
        log.debug("handleMessage" + json);
        // sendMessageToUsers();
        Message message = this.dewrapMessage(json);
        //echo
        if (message.getRecieveUserID() == SYSTEM_ID) {
            message.setRecieveUserID(message.getSendUserID());
            message.setSendUserID(SYSTEM_ID);
            message.setTextMessage("echo " + message.getTextMessage());
            message.setSendTime(Calendar.getInstance().getTime().getTime());
        }
        this.sendMessage(message);
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

    private User getSessionUser(WebSocketSession session) {
        System.out.println(session.getAttributes().get(HttpSessionHandshakeInterceptor.HTTP_SESSION_ID_ATTR_NAME));
        User currentUser = (User) session.getAttributes().get(User.class.getName());
        return currentUser;
    }
}
