package com.nosy.email.nosyemail.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.Set;


@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Component
public class EmailTemplate {
    private String emailTemplateId;
    private String emailTemplateName;
    private String fromAddress;
    private String emailFromProvider;
    private Set<String> emailTemplateTo;
    private Set<String> emailTemplateCc;
    private String text;
    private int retryTimes;
    private int retryPeriod;
    private int priority;
    private String subject;

    public String getEmailFromProvider() {
        return emailFromProvider;
    }

    public void setEmailFromProvider(String emailFromProvider) {
        this.emailFromProvider = emailFromProvider;
    }

    public String getEmailTemplateId() {
        return emailTemplateId;
    }

    public void setEmailTemplateId(String emailTemplateId) {
        this.emailTemplateId = emailTemplateId;
    }

    public String getEmailTemplateName() {
        return emailTemplateName;
    }

    public void setEmailTemplateName(String emailTemplateName) {
        this.emailTemplateName = emailTemplateName;
    }

    public String getFromAddress() {
        return fromAddress;
    }

    public void setFromAddress(String fromAddress) {
        this.fromAddress = fromAddress;
    }

    public Set<String> getEmailTemplateTo() {
        return emailTemplateTo;
    }

    public void setEmailTemplateTo(Set<String> emailTemplateTo) {
        this.emailTemplateTo = emailTemplateTo;
    }

    public Set<String> getEmailTemplateCc() {
        return emailTemplateCc;
    }

    public void setEmailTemplateCc(Set<String> emailTemplateCc) {
        this.emailTemplateCc = emailTemplateCc;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRetryTimes() {
        return retryTimes;
    }

    public void setRetryTimes(int retryTimes) {
        this.retryTimes = retryTimes;
    }

    public int getRetryPeriod() {
        return retryPeriod;
    }

    public void setRetryPeriod(int retryPeriod) {
        this.retryPeriod = retryPeriod;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }



    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "EmailTemplate{" +
                "emailTemplateId='" + emailTemplateId + '\'' +
                ", emailTemplateName='" + emailTemplateName + '\'' +
                ", fromAddress='" + fromAddress + '\'' +
                ", emailTemplateTo=" + emailTemplateTo +
                ", emailTemplateCc=" + emailTemplateCc +
                ", text='" + text + '\'' +
                ", retryTimes=" + retryTimes +
                ", retryPeriod=" + retryPeriod +
                ", priority=" + priority +
                ", subject='" + subject + '\'' +
                '}';
    }
}
