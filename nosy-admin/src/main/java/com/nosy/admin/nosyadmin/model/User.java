package com.nosy.admin.nosyadmin.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name="nosy_user")

public class User {
    @Id
    @NotNull
    @Email
    private String email;
    @JsonManagedReference

    @OneToMany(mappedBy = "user",orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<InputSystem> inputSystem;

    @Transient
    private String password;

    private String firstName;
    private String lastName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    private String info;

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<InputSystem> getInputSystem() {
        return inputSystem;
    }

    public void setInputSystem(Set<InputSystem> inputSystem) {
        this.inputSystem = inputSystem;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", inputSystem=" + inputSystem +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", info='" + info + '\'' +
                '}';
    }
}
