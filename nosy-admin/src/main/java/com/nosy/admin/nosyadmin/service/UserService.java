package com.nosy.admin.nosyadmin.service;

import com.nosy.admin.nosyadmin.config.security.KeycloakClient;
import com.nosy.admin.nosyadmin.exceptions.GeneralException;
import com.nosy.admin.nosyadmin.model.User;
import com.nosy.admin.nosyadmin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserService {
    private UserRepository userRepository;
    private KeycloakClient keycloakClient;

    @Autowired
    public UserService(UserRepository userRepository, KeycloakClient keycloakClient){
        this.userRepository=userRepository;
        this.keycloakClient=keycloakClient;
    }
    public User getUserInfo(HttpServletRequest request){
        request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        return keycloakClient.getUserInfo(request.getUserPrincipal().getName());

    }

    public void deleteUser(HttpServletRequest request){
        request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        String obtainedUser=request.getUserPrincipal().getName();


            keycloakClient.deleteUsername(obtainedUser);
            userRepository.deleteById(obtainedUser);



    }

    public void logoutUser(HttpServletRequest request){
        request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        keycloakClient.logoutUser(request.getUserPrincipal().getName());
    }


    public User addUser(User user){
      if(!isValidPassword(user.getPassword())) {
            throw new GeneralException("Password is not valid");
      }
        boolean isRegistered=keycloakClient.registerNewUser(user);

        if(isRegistered==false){
            throw new GeneralException("User already exists in database please try another email");
        }

        return userRepository.saveAndFlush(user);

    }


    private boolean isValidPassword(String password){
        if (null==password || password.length()<=1){
            return false;
        }
        return true;
    }


}
