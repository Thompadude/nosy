package com.nosy.admin.nosyadmin.service;

import com.nosy.admin.nosyadmin.exceptions.GeneralException;
import com.nosy.admin.nosyadmin.model.InputSystem;
import com.nosy.admin.nosyadmin.model.User;
import com.nosy.admin.nosyadmin.repository.InputSystemRepository;
import com.nosy.admin.nosyadmin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class InputSystemService {

    private InputSystemRepository inputSystemRepository;
    private UserRepository userRepository;

    @Autowired
    public InputSystemService(InputSystemRepository inputSystemRepository, UserRepository userRepository) {
        this.inputSystemRepository = inputSystemRepository;
        this.userRepository = userRepository;

    }

    public Set<InputSystem> getListOfInputSystems(String username) {
        User optionalUserRepository = userRepository.findById(username).get();
        if (optionalUserRepository==null) {
            throw new GeneralException("You are not authenticated. Please login first");
        }
        return optionalUserRepository.getInputSystem();
    }

    public void deleteInputSystem(String inputSystemId, String email) {
        InputSystem checkInputSystem = inputSystemRepository.findByIdAndEmail(email, inputSystemId);
        if (checkInputSystem==null) {
            throw new GeneralException("No Input System with specified Id was found." +
                    "Please create it before updating");
        }
        if(!checkInputSystem.getEmailTemplate().isEmpty()){
            throw new GeneralException("Input System cannot be deleted. Because it has dependent children. " +
                    "Please delete Email Templates associated with this InputSystem to be able to delete it");
        }
        inputSystemRepository.deleteById(inputSystemId);
    }

    public InputSystem saveInputSystem(InputSystem inputSystem, String email) {
        if (inputSystem.getInputSystemName() == null || inputSystem.getInputSystemName().trim().equals("")) {
            throw new GeneralException("Input System Name is mandatory field");
        }
        InputSystem inputSystem1 = inputSystemRepository.findByInputSystemNameAndEmail(email, inputSystem.getInputSystemName());
        if ((inputSystem1 != null)) {

            throw new GeneralException("Input System with specified name already exists. Please another name.");
        }
        Optional<User> user = userRepository.findById(email);



        inputSystem.setUser(user.get());
        return inputSystemRepository.save(inputSystem);
    }


    public InputSystem updateInputSystemStatus(String inputSystemId, InputSystem inputSystem, String email) {

        InputSystem checkInputSystem = inputSystemRepository.findByIdAndEmail(email, inputSystemId);

        if (checkInputSystem==null) {
            throw new GeneralException("No Input System with specified Id was found." +
                    "Please create it before updating");
        }
        InputSystem checkDuplicate=inputSystemRepository.findByInputSystemNameAndEmail(email, inputSystem.getInputSystemName());
        if(checkDuplicate!=null){
            throw new GeneralException("InputSystem with current name already exists in the system please. Please try another name");
        }
        checkInputSystem.setInputSystemName(inputSystem.getInputSystemName());

        return inputSystemRepository.save(checkInputSystem);


    }


}