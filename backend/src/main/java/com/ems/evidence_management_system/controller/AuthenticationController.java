package com.ems.evidence_management_system.controller;

import com.ems.evidence_management_system.entity.User;
import com.ems.evidence_management_system.model.LoginUserRequest;
import com.ems.evidence_management_system.model.RegisterUserRequest;
import com.ems.evidence_management_system.service.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletionStage;

@RestController
@RequestMapping("/authentication")
@Slf4j
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public CompletionStage<ResponseEntity<User>> register(RegisterUserRequest registerUserRequest) {
        log.info("Received request to register user: " + registerUserRequest.toString());
        return authenticationService.register(registerUserRequest)
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping("/login")
    public CompletionStage<ResponseEntity<User>> login(LoginUserRequest loginUserRequest) {
        log.info("Received request to login user: " + loginUserRequest.toString());
        return authenticationService.login(loginUserRequest)
                .thenApply(ResponseEntity::ok);
    }
}
