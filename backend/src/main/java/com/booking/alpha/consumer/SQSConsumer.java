package com.booking.alpha.consumer;

import com.booking.alpha.configuration.SQSConfiguration;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SQSConsumer extends BaseSQSConsumer {

    public SQSConsumer(SQSConfiguration sqsConfiguration, ObjectMapper objectMapper) {

        super( sqsConfiguration, sqsConfiguration.getGetUnReservingQueueUrl(), objectMapper, new JSONParser());
        new Thread(()->{
            try {
                start();
            }catch (Throwable e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void start() throws Throwable {
        while(true) {
            List<Object> objectList = getMessages();
            if(objectList.isEmpty()) {
                Thread.sleep(2000L);
            }
        }
    }
}
