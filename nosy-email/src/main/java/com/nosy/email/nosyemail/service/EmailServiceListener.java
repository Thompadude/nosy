package com.nosy.email.nosyemail.service;


import com.nosy.email.nosyemail.model.ReadyEmail;
import com.nosy.email.nosyemail.stream.EmailStreams;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.StreamListener;

import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
@Slf4j
public class EmailServiceListener {
    private EmailServiceYandex emailServiceYandex;
    private EmailServiceGmail emailServiceGmail;
    private EmailServiceDefault emailServiceDefault;

    @Autowired
    public EmailServiceListener(EmailServiceYandex emailServiceYandex,
            EmailServiceGmail emailServiceGmail,
            EmailServiceDefault emailServiceDefault){
        this.emailServiceDefault=emailServiceDefault;
        this.emailServiceGmail=emailServiceGmail;
        this.emailServiceYandex=emailServiceYandex;

    }

    @StreamListener(EmailStreams.INPUT)
    public void handleGreetings(@Payload ReadyEmail readyEmail) throws MessagingException, JSONException {
        if(readyEmail.getEmailTemplate().getEmailFromProvider().equals("Yandex")){
            emailServiceYandex.send(readyEmail);
        }
        else if(readyEmail.getEmailTemplate().getEmailFromProvider().equals("Gmail")){
            emailServiceGmail.send(readyEmail);
        }
        else{
            emailServiceDefault.send(readyEmail);
        }

    }
}