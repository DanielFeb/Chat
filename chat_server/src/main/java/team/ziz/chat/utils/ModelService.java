package team.ziz.chat.utils;

import org.springframework.stereotype.Service;

import java.lang.reflect.Field;

/**
 * @author: Daniel Create Date：2016/10/16
 */
@Service
public class ModelService implements IModelService {
    @Override
    public void replaceNullValues(Object obj) {
        Class<? extends Object> cls = obj.getClass();
        System.out.println("ModelService replaceNullValues of cls:" + cls);

        Field[] fields = cls.getDeclaredFields();
        for (Field field : fields) {
            System.out.println("-" + field.getType().getName() + ":" + field.getName());
            field.setAccessible(true);
            if (field.getType().equals(String.class)) {
                System.out.println("--It's string");
                try {
                    if (field.get(obj) == null) {
                        field.set(obj, "");
                        System.out.println("--Set to empty.");
                    } else {
                        System.out.println("--Not empty.");
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
