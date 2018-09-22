package com.nosy.admin.nosyadmin.model;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Embeddable
@Getter
@Setter
public class EmailTemplateTo {
    private int status;


    @NotNull
    private String address;

}
