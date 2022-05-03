package com.booking.alpha.utils;


import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

    public List<Message> getMessages( String queueUrl, Set<String> attributeNames) throws ParseException {
        ReceiveMessageRequest messageRequest = new ReceiveMessageRequest(queueUrl)
                .withWaitTimeSeconds(10)
                .withMessageAttributeNames("All")
                .withMaxNumberOfMessages(10);
        return amazonSQS.receiveMessage(messageRequest).getMessages();
    }

    public SendMessageResult publishMessage(String queueUrl, HashMap<String, Object> attributes, Object message) throws JsonProcessingException {
        if(ObjectUtils.isEmpty(attributes)) {
            attributes = new HashMap<>();
        }
        if(ObjectUtils.isEmpty(message)) {
            message = new HashMap<>();
        }
        int DELAY_SECONDS = 1;
        Map<String, MessageAttributeValue> messageAttributeValueMap = new HashMap<>();
        for( String key: attributes.keySet()) {
            Object value = attributes.get(key);
            MessageAttributeValue attributeValue = new MessageAttributeValue()
                    .withStringValue(objectMapper.writeValueAsString(value))
                    .withDataType("String");
            messageAttributeValueMap.put(key, attributeValue);
        }
        String messageBody = objectMapper.writeValueAsString(message);
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
