package com.booking.alpha.utils;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.booking.alpha.configuration.S3Configuration;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;

@Service
@FieldDefaults(level= AccessLevel.PRIVATE)
public class S3Utils {

    final AmazonS3 s3Client;

    public S3Utils(S3Configuration s3Configuration) {
        AWSCredentials awsCredentials = new BasicAWSCredentials( s3Configuration.getAwsAccessKey(), s3Configuration.getAwsSecretKey());
        s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).withRegion(Regions.US_EAST_2).build();
    }

    public void uploadFile(String bucketName, String folder, InputStream inputStream) throws IOException {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(inputStream.available());
        s3Client.putObject( bucketName, folder, inputStream, objectMetadata);
    }

    public String getFileURL(String bucketName, String fileName){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, 6);
        return s3Client.generatePresignedUrl( bucketName, fileName, calendar.getTime()).toString();
    }
}
