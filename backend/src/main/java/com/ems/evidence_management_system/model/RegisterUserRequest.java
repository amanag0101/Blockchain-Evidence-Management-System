package com.ems.evidence_management_system.model;

import lombok.Data;

@Data
public class RegisterUserRequest {
    private String name;

    private String username;

    private String department;

    private String password;
}
