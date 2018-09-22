package com.nosy.admin.nosyadmin.service;

import com.nosy.admin.nosyadmin.exceptions.GeneralException;
import com.nosy.admin.nosyadmin.model.*;
import com.nosy.admin.nosyadmin.repository.EmailTemplateRepository;
import com.nosy.admin.nosyadmin.repository.InputSystemRepository;
import com.nosy.admin.nosyadmin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class EmailTemplateService {

    private EmailTemplateRepository emailTemplateRepository;
    private EmailServiceStream emailServiceStream;
    private InputSystemRepository inputSystemRepository;
    private ReadyEmail readyEmail;
    private UserRepository userRepository;

    @Value("${default.nosy.from.address}")
    private String defaultNosyFromAddress;

    @Autowired
    public EmailTemplateService(EmailTemplateRepository emailTemplateRepository, EmailServiceStream emailServiceStream,
                                InputSystemRepository inputSystemRepository, ReadyEmail readyEmail, UserRepository userRepository) {
        this.emailServiceStream = emailServiceStream;
        this.emailTemplateRepository = emailTemplateRepository;
        this.inputSystemRepository = inputSystemRepository;
        this.userRepository=userRepository;
        this.readyEmail=readyEmail;
    }

    public EmailTemplate getEmailTemplateById(String emailTemplateId, String inputSystemId, String email) {
        if(!checkUsername(email)){
            throw new GeneralException("You are not authenticated. Please login first");

        }

        InputSystem inputSystem = inputSystemRepository.findByIdAndEmail(email, inputSystemId);
        if (inputSystem == null) {
            throw new GeneralException("No Input System with specified id was found.");
        }
        EmailTemplate emailTemplate=emailTemplateRepository.findEmailTemplatesByInputSystemIdAndEmailTemplateId(
                inputSystemId,emailTemplateId);
        if(emailTemplate==null){
            throw new GeneralException("No Template was found with specified request. Please correct your request");
        }


        return emailTemplate;
    }


    public List<String> getAllEmailProviders() {
        return Stream.of(EmailFromProvider.values())
                .map(EmailFromProvider::name)
                .collect(Collectors.toList());


    }

    public void deleteEmailTemplate(String inputSystemId, String emailTemplateId, String email) {
        if(!checkUsername(email)){
            throw new GeneralException("You are not authenticated. Please login first");

        }

        InputSystem inputSystem = inputSystemRepository.findByIdAndEmail(email, inputSystemId);
        if (inputSystem == null) {
            throw new GeneralException("No Input System with specified id was found.");
        }




        emailTemplateRepository.deleteById(emailTemplateId);
    }


    public EmailTemplate newEmailTemplate(EmailTemplate emailTemplate, String id, String email) {
        if (!checkUsername(email)) {
            throw new GeneralException("You are not authenticated. Please login first");

        }


        InputSystem inputSystem = inputSystemRepository.findByIdAndEmail(email, id);
        if (inputSystem == null) {
            throw new GeneralException("No Input System with specified id was found.");
        }
        if(emailTemplateRepository.findEmailTemplateByEmailTemplateNameAndInputSystemId(emailTemplate.getEmailTemplateName(), id)!=null){
            throw new GeneralException("Email Template already exists. Please try another name");
        }

        emailTemplate.setInputSystem(inputSystem);
        emailTemplateRepository.save(emailTemplate);


        return emailTemplate;
    }

    public List<EmailTemplate> getListOfEmailTemplates(String inputSystemId, String email) {

        InputSystem inputSystem = inputSystemRepository.findByIdAndEmail(email, inputSystemId);
        if (inputSystem == null) {
            throw new GeneralException("No Input System with specified id was found.");
        }

        return emailTemplateRepository.findEmailTemplatesByInputSystemId(inputSystemId);
    }


    public EmailTemplate postEmailTemplate(String inputSystemId, String emailTemplateId,
                                    EmailProviderProperties emailProviderProperties, String email)  {


        InputSystem inputSystem = inputSystemRepository.findByIdAndEmail(email, inputSystemId);
        if (inputSystem == null) {
            throw new GeneralException("No Input System with specified id was found.");
        }

        EmailTemplate emailTemplate = emailTemplateRepository.
                findEmailTemplatesByInputSystemIdAndEmailTemplateId(inputSystemId, emailTemplateId);
        if (emailTemplate == null) {
            throw new GeneralException("No Template was found with specified request. Please correct your request");
        }

        boolean auth=(emailProviderProperties.getUsername() == null ||
                emailProviderProperties.getUsername().equals("") ||
                emailProviderProperties.getPassword()==null || emailProviderProperties.getPassword().equals(""));


        if(!emailTemplate.getEmailFromProvider().equals(EmailFromProvider.Default) && auth){
            throw new GeneralException("Username and password required for non-Default Email Provider");


        }

         String text = emailTemplate.getText();

        for(PlaceHolders placeholder: emailProviderProperties.getPlaceholders()){
            text = text.replace("#{" + placeholder.getName() + "}#", placeholder.getValue());
        }

        if (text.contains("#{") || text.contains("}#")) {
            throw new GeneralException("Not enough paramaters to replace. Please add all placeholders");
        }
        emailTemplate.setText(text);
        readyEmail.setEmailTemplate(emailTemplate);
        readyEmail.setEmailProviderProperties(emailProviderProperties);
        emailServiceStream.sendEmailTemplate(readyEmail);
        return emailTemplate;


}


    public EmailTemplate updateEmailTemplate(EmailTemplate emailTemplate, String inputSystemId, String emailTemplateId, String email) {

        if(!checkUsername(email)){
            throw new GeneralException("You are not authenticated. Please login first");

        }

        InputSystem inputSystem = inputSystemRepository.findByIdAndEmail(email, inputSystemId);
        if (inputSystem == null) {
            throw new GeneralException("No Input System with specified id was found.");
        }
        EmailTemplate currentEmailTemplate=emailTemplateRepository.findEmailTemplatesByInputSystemIdAndEmailTemplateId(
                inputSystemId,emailTemplateId);
        if(currentEmailTemplate==null){
            throw new GeneralException("No Template was found with specified request. Please correct your request");
        }

        if(!currentEmailTemplate.getEmailTemplateName().equals(emailTemplate.getEmailTemplateName())) {
            if (emailTemplateRepository.findEmailTemplateByEmailTemplateNameAndInputSystemId(
                            emailTemplate.getEmailTemplateName(), inputSystemId) != null) {
                throw new GeneralException("Email Template already exists. Please try another name");
            }
        }
        if(emailTemplate.getEmailTemplateName()==null ||
                emailTemplate.getEmailTemplateName().isEmpty()){
            throw new GeneralException("Email Template Name cannot be null or empty");

        }

        if(emailTemplate.getFromAddress()==null && emailTemplate.getFromAddress().isEmpty()){

            currentEmailTemplate.setFromAddress(defaultNosyFromAddress);
        }


        currentEmailTemplate.setEmailTemplateName(emailTemplate.getEmailTemplateName());

        currentEmailTemplate.setEmailTemplateTo(emailTemplate.getEmailTemplateTo());
        currentEmailTemplate.setFromAddress(emailTemplate.getFromAddress());
        currentEmailTemplate.setText(emailTemplate.getText());
        currentEmailTemplate.setEmailFromProvider(emailTemplate.getEmailFromProvider());
        currentEmailTemplate.setEmailTemplateCc(emailTemplate.getEmailTemplateCc());
        currentEmailTemplate.setPriority(emailTemplate.getPriority());
        currentEmailTemplate.setRetryPeriod(emailTemplate.getRetryPeriod());
        currentEmailTemplate.setRetryTimes(emailTemplate.getRetryTimes());
        currentEmailTemplate.setSubject(emailTemplate.getSubject());
        emailTemplateRepository.save(currentEmailTemplate);
        return currentEmailTemplate;
    }

    public boolean checkUsername(String email) {

        return userRepository.findById(email).isPresent();
    }


}

