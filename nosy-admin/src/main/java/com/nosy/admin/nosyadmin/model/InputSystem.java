package com.nosy.admin.nosyadmin.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@DynamicInsert

@Entity
@Table(
        name="inputSystem",
          uniqueConstraints=
          @UniqueConstraint(columnNames={"inputSystemName", "email"})
)
public class InputSystem {
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Id
    @NotNull
    private String inputSystemId;
    @NotNull
    private String inputSystemName;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="email")
    private User user;


    @JsonManagedReference

    @OneToMany(mappedBy="inputSystem", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<EmailTemplate> emailTemplate;

    public String getInputSystemId() {
        return inputSystemId;
    }

    public void setInputSystemId(String inputSystemId) {
        this.inputSystemId = inputSystemId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getInputSystemName() {
        return inputSystemName;
    }

    public void setInputSystemName(String inputSystemName) {
        this.inputSystemName = inputSystemName;
    }


    public Set<EmailTemplate> getEmailTemplate() {
        return emailTemplate;
    }

    public void setEmailTemplate(Set<EmailTemplate> emailTemplate) {
        this.emailTemplate = emailTemplate;
    }

}
