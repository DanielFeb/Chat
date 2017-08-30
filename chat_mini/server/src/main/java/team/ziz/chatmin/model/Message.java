package team.ziz.chatmin.model;

public class Message {
   private int sendUserID;
   private int recieveUserID;
   private String textMessage;
   
   public Message(int sendUserID, int recieveUserID, String textMessage){
      this.sendUserID = sendUserID;
      this.recieveUserID = recieveUserID;
      this.textMessage = textMessage;
   }
   
   public Message(){
      
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
   
}