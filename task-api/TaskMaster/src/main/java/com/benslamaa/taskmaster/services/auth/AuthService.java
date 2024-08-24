package com.benslamaa.taskmaster.services.auth;

import com.benslamaa.taskmaster.dto.SignUpRequest;
import com.benslamaa.taskmaster.dto.UserDto;

public interface AuthService {

    UserDto signUpUser(SignUpRequest signUpRequest);

    boolean hasUserWithEmail(String email);
}
