package com.nosy.email.nosyemail.service;

import com.nosy.email.nosyemail.model.EmailProviderProperties;
import com.nosy.email.nosyemail.model.EmailTemplate;
import com.nosy.email.nosyemail.model.ReadyEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceYandex  {

    @Autowired
    @Qualifier("Yandex")
    private JavaMailSenderImpl javaMailSender;




    public void send(ReadyEmail readyEmail) {
        javaMailSender.setUsername(readyEmail.getEmailProviderProperties().getUsername());
        javaMailSender.setPassword(readyEmail.getEmailProviderProperties().getPassword());
        MimeMessage message=javaMailSender.createMimeMessage();
        ;
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message);
        try {
            if (readyEmail.getEmailTemplate().getFromAddress() != null) {
                mimeMessageHelper.setFrom(readyEmail.getEmailTemplate().getFromAddress());
            }
            mimeMessageHelper.setSubject(readyEmail.getEmailTemplate().getSubject());
            mimeMessageHelper.setText(readyEmail.getEmailTemplate().getText(),true);
            readyEmail.getEmailTemplate().getEmailTemplateTo().forEach(emailTo->
            {
                try {
                    mimeMessageHelper.addTo(emailTo);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            });
            if(!readyEmail.getEmailTemplate().getEmailTemplateCc().isEmpty()){
                readyEmail.getEmailTemplate().getEmailTemplateCc().forEach(emailCc->
                {
                    try {
                        mimeMessageHelper.addCc(emailCc);

                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
                });

            };


            this.javaMailSender.send(message);

        } catch (MessagingException messageException) {
           messageException.printStackTrace();
            throw new RuntimeException(messageException);
        }
    }
}
