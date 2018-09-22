package com.nosy.admin.nosyadmin.service;

import com.nosy.admin.nosyadmin.model.ReadyEmail;
import lombok.extern.slf4j.Slf4j;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@EnableBinding(EmailServiceStream.MultipleProcessor.class)
public class EmailServiceStream {
   private final MessageChannel messageChannel;

   public EmailServiceStream(MultipleProcessor multipleProcessor){
        this.messageChannel=multipleProcessor.sendemail();
   }
    @SendTo("sendemail")
    public void sendEmailTemplate(ReadyEmail readyEmail) {
       Message<ReadyEmail> message= MessageBuilder.withPayload(readyEmail).build();
        messageChannel.send(message);
    }




    interface MultipleProcessor {
       String OUTPUT = "sendemail";


        @Output(OUTPUT)
        MessageChannel sendemail();
    }
}
