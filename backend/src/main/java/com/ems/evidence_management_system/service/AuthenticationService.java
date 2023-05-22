package com.ems.evidence_management_system.service;

import com.ems.evidence_management_system.entity.User;
import com.ems.evidence_management_system.model.Department;
import com.ems.evidence_management_system.model.LoginUserRequest;
import com.ems.evidence_management_system.model.RegisterUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

@Service
public class AuthenticationService {
    private final UserService userService;

    @Autowired
    public AuthenticationService(UserService userService) {
        this.userService = userService;
    }

    public CompletionStage<User> register(RegisterUserRequest registerUserRequest) {
        return CompletableFuture.completedFuture(getUser(registerUserRequest))
                .thenCompose(userService::save);
    }

    public CompletionStage<User> login(LoginUserRequest loginUserRequest) {
        return userService.getByUsername(loginUserRequest.getUsername());
    }

    private User getUser(RegisterUserRequest registerUserRequest) {
        return User.builder()
                .username(registerUserRequest.getUsername())
                .name(registerUserRequest.getName())
                .department(Department.valueOf(registerUserRequest.getDepartment()))
                .build();
    }
}
