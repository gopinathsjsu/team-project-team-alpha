package com.booking.alpha.configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SQSConfiguration {

    @Value("${amazon.s3.access-key}")
    String awsAccessKey;

    @Value("${amazon.s3.secret-key}")
    String awsSecretKey;

    @Value("${amazon.sqs.unreserving-queue-url}")
    String getUnReservingQueueUrl;

    @Bean
    public AmazonSQS getAmazonSqsHandler() {
        AWSCredentials awsCredentials = new BasicAWSCredentials( getAwsAccessKey(), getAwsSecretKey());
        return AmazonSQSClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(Regions.US_EAST_1).build();
    }
}
