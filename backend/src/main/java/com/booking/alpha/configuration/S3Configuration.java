package com.booking.alpha.configuration;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@FieldDefaults(level = AccessLevel.PRIVATE)
public class S3Configuration {

    @Value("${amazon.s3.access-key}")
    String awsAccessKey;

    @Value("${amazon.s3.secret-key}")
    String awsSecretKey;
}
