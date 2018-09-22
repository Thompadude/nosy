package com.nosy.email.nosyemail.stream;

import org.springframework.cloud.stream.annotation.Input;

import org.springframework.messaging.SubscribableChannel;

public interface EmailStreams {

    String INPUT = "sendemail-in";


    @Input(INPUT)
    SubscribableChannel inboundGreetings();
}
