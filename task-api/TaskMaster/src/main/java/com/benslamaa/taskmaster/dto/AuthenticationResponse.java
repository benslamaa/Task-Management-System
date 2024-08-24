package com.benslamaa.taskmaster.dto;

import com.benslamaa.taskmaster.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;

}
