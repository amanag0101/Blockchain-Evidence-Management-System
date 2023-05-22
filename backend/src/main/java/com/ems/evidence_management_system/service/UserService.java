package com.ems.evidence_management_system.service;

import com.ems.evidence_management_system.entity.User;
import com.ems.evidence_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public CompletionStage<User> getByUsername(String username) {
        return CompletableFuture.completedFuture(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found!")));
    }

    public CompletableFuture<User> save(User user) {
        return CompletableFuture.completedFuture(userRepository.save(user));
    }
}
