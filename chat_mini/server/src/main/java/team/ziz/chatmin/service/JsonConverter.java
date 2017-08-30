package team.ziz.chatmin.service;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonConverter {
   public static <T> T JsonToObject(String json, Class<T> className){
      ObjectMapper objectMapper = new ObjectMapper();
      try {
         return objectMapper.readValue(json, className);
      } catch (JsonParseException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      } catch (JsonMappingException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      } catch (IOException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      return null;
   }

   public static String ObjectToJson(Object obj) {
      ObjectMapper objectMapper = new ObjectMapper();
      try {
         return objectMapper.writeValueAsString(obj);
      } catch (Exception e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      return null;
   }
}
