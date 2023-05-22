package com.ems.evidence_management_system.entity;

import com.ems.evidence_management_system.model.Department;
import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String username;

    @Enumerated(EnumType.STRING)
    private Department department;

    private String password;
}
