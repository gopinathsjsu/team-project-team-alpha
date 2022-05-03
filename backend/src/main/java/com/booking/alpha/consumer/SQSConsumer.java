package com.booking.alpha.consumer;

import com.amazonaws.services.sqs.model.Message;
import com.booking.alpha.configuration.SQSConfiguration;
import com.booking.alpha.constant.BookingState;
import com.booking.alpha.constant.ConsumerKeys;
import com.booking.alpha.entry.ReservationEntry;
import com.booking.alpha.service.ReservationService;
import com.booking.alpha.utils.SQSUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
public class SQSConsumer {

    private final String queueUrl;

    private final SQSUtils sqsUtils;

    private final ReservationService reservationService;

    private final ObjectMapper objectMapper;

    public SQSConsumer(SQSUtils sqsUtils, ObjectMapper objectMapper, SQSConfiguration sqsConfiguration, ReservationService reservationService) {

        this.sqsUtils = sqsUtils;
        this.objectMapper = objectMapper;
        this.queueUrl = sqsConfiguration.getGetUnReservingQueueUrl();
        this.reservationService = reservationService;

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
            List<Message> messages = sqsUtils.getMessages(queueUrl, new HashSet<>(Arrays.asList(ConsumerKeys.RESERVATION_ID_KEY)));
            if(ObjectUtils.isEmpty(messages)) {
                Thread.sleep(2000L);
            }
            for(Message message: messages) {
                if(process(message)) {
                    sqsUtils.deleteMessage( queueUrl, message);
                }
            }
        }
    }

    Boolean process(Message message) {
        try{
            ReservationEntry reservationEntry = objectMapper.readValue(message.getBody(), new TypeReference<ReservationEntry>() {});
            if(reservationEntry.getBookingState().equals(BookingState.PENDING)) {
                reservationService.removeReservation(reservationEntry.getId());
            }
            return true;
        } catch (Throwable e) {
            return false;
        }
    }
}
