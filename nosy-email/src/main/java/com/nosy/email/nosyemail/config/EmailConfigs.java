package com.nosy.email.nosyemail.config;

import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class EmailConfigs {

    @Bean("Yandex")
    public JavaMailSenderImpl javaMailYandexSender(){
        JavaMailSenderImpl yandex= new JavaMailSenderImpl();

        Properties javaMailProperties = new Properties();
        yandex.setHost("smtp.yandex.ru");
        yandex.setPort(465);
        javaMailProperties.put("mail.smtp.auth", "true");
        javaMailProperties.put("mail.debug", "true");
        javaMailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        yandex.setJavaMailProperties(javaMailProperties);
        return yandex;

    }

    @Bean("Gmail")
    public JavaMailSenderImpl javaMailGmailSender(){
        JavaMailSenderImpl gmail= new JavaMailSenderImpl();

        Properties javaMailProperties = new Properties();
        gmail.setHost("smtp.gmail.com");
        gmail.setPort(465);
        javaMailProperties.put("mail.smtp.auth", "true");
        javaMailProperties.put("smtp.starttls.enable", "true");
        javaMailProperties.put("smtp.starttls.required", "true");
        javaMailProperties.put("smtp.ssl.enable", "true");

        javaMailProperties.put("mail.debug", "true");
        javaMailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        gmail.setJavaMailProperties(javaMailProperties);
        return gmail;

    }
    @Bean("Default")
    public JavaMailSenderImpl javaMailDefaultSender(){
        return javaMailYandexSender();
    }

}
