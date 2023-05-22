package com.ems.evidence_management_system.model;

import lombok.Data;

@Data
public class LoginUserRequest {
    private String username;

    private String password;
}
