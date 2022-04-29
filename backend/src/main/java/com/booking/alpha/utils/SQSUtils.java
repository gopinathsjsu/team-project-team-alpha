package com.booking.alpha.utils;


import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * https://www.baeldung.com/aws-queues-java
 * https://www.baeldung.com/aws-s3-java
 *
 * */

@Service
public class SQSUtils {

    private final AmazonSQS amazonSQS;

    private final ObjectMapper objectMapper;

    public SQSUtils(AmazonSQS amazonSQS, ObjectMapper objectMapper) {
        this.amazonSQS = amazonSQS;
        this.objectMapper = objectMapper;
    }

    public List<Message> getMessages( String queueUrl) throws ParseException {
        ReceiveMessageRequest messageRequest = new ReceiveMessageRequest(queueUrl)
                .withWaitTimeSeconds(10)
                .withMaxNumberOfMessages(10);
        return amazonSQS.receiveMessage(messageRequest).getMessages();
    }

    public SendMessageResult publishMessage(String queueUrl, Object message) {
        int DELAY_SECONDS = 600;
        Map<String, MessageAttributeValue> messageAttributeValueMap = new HashMap<>();
        String messageBody = objectMapper.convertValue(message, new TypeReference<String>() {});
        SendMessageRequest messageRequest = new SendMessageRequest()
                .withQueueUrl(queueUrl)
                .withMessageBody(messageBody)
                .withMessageAttributes(messageAttributeValueMap)
                .withDelaySeconds(DELAY_SECONDS);
        return amazonSQS.sendMessage(messageRequest);
    }

    public void deleteMessage( String queueUrl, Message message) {
        amazonSQS.deleteMessage( queueUrl, message.getReceiptHandle());
    }
}
