package com.nosy.email.nosyemail.config;

import com.nosy.email.nosyemail.stream.EmailStreams;
import org.springframework.cloud.stream.annotation.EnableBinding;

@EnableBinding(EmailStreams.class)
public class StreamsConfig {
}