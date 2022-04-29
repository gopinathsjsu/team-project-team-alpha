package com.booking.alpha.consumer;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.SendMessageRequest;
import com.amazonaws.services.sqs.model.SendMessageResult;
import com.amazonaws.services.sqs.model.MessageAttributeValue;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.booking.alpha.configuration.SQSConfiguration;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/*
* https://www.baeldung.com/aws-queues-java
* https://www.baeldung.com/aws-s3-java
* 
* */
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class BaseSQSConsumer {

    final AmazonSQS amazonSQS;

    final String queueUrl;

    final ObjectMapper objectMapper;

    final JSONParser jsonParser;

    public BaseSQSConsumer(SQSConfiguration sqsConfiguration, String queueUrl, ObjectMapper objectMapper, JSONParser jsonParser) {
        AWSCredentials awsCredentials = new BasicAWSCredentials( sqsConfiguration.getAwsAccessKey(),
                sqsConfiguration.getAwsSecretKey());
        this.amazonSQS = AmazonSQSClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(Regions.US_EAST_2).build();
        this.queueUrl = queueUrl;
        this.objectMapper = objectMapper;
        this.jsonParser = jsonParser;
    }

    public SendMessageResult publishMessage(Object message) {
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

    public List<Object> getMessages() throws ParseException {
        ReceiveMessageRequest messageRequest = new ReceiveMessageRequest(queueUrl)
                .withWaitTimeSeconds(10)
                .withMaxNumberOfMessages(10);
        List<Message> messageList = amazonSQS.receiveMessage(messageRequest).getMessages();
        List<Object> messageBodies = new ArrayList<>();
        for(Message message : messageList) {
            messageBodies.add(jsonParser.parse(message.getBody()));
        }
        return messageBodies;
    }
}
