package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.ApplicationUser;
import com.example.models.LoginRequestDTO;
import com.example.models.LoginResponseDTO;
import com.example.models.RegistrationDTO;
import com.example.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword(),body.getEmail(),body.getPhoneNo());
    }
    
    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }
}   
