package team.ziz.chat.model;

import java.util.Date;

public class Message {
    private int sendUserID;
    private int recieveUserID;
    private String textMessage;
    private long sendTime;

    public Message(int sendUserID, int recieveUserID, String textMessage, long sendTime) {
        this.sendUserID = sendUserID;
        this.recieveUserID = recieveUserID;
        this.textMessage = textMessage;
        this.sendTime = sendTime;
    }

    public Message() {

    }

    public int getSendUserID() {
        return sendUserID;
    }

    public void setSendUserID(int sendUserID) {
        this.sendUserID = sendUserID;
    }

    public int getRecieveUserID() {
        return recieveUserID;
    }

    public void setRecieveUserID(int recieveUserID) {
        this.recieveUserID = recieveUserID;
    }

    public String getTextMessage() {
        return textMessage;
    }

    public void setTextMessage(String textMessage) {
        this.textMessage = textMessage;
    }

    public long getSendTime() {
        return sendTime;
    }

    public void setSendTime(long sendTime) {
        this.sendTime = sendTime;
    }

}