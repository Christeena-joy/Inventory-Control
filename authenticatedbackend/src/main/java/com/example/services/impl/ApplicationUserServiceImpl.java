package com.example.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.example.dto.ApplicationUserDto;
import com.example.models.ApplicationUser;
import com.example.repository.UserRepository;
import com.example.services.ApplicationUserService;

@Service
public class ApplicationUserServiceImpl implements ApplicationUserService {

    private final UserRepository userRepository;

    public ApplicationUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public ApplicationUserDto getUserById(Integer userId) {
        ApplicationUser user = userRepository.findById(userId).orElse(null);
        System.out.println("Application user  "+user);
        if (user != null) {
            ApplicationUserDto userDto = new ApplicationUserDto();
            BeanUtils.copyProperties(user, userDto);
         // Copy authorities (roles) from user to userDto
            userDto.setAuthorities(user.getAuthorities().stream()
                    .map(role -> role.getAuthority())  
                    .collect(Collectors.toSet()));


        
            return userDto;
        }
        return null; // Handle user not found scenario
    }

    @Override
    public List<ApplicationUserDto> getAllUsers() {
        List<ApplicationUser> users = userRepository.findAll();
        return users.stream()
                .map(user -> {
                    ApplicationUserDto userDto = new ApplicationUserDto();
                    BeanUtils.copyProperties(user, userDto);
                    userDto.setAuthorities(user.getAuthorities().stream()
                            .map(role -> role.getAuthority())  // Fix this line
                            .collect(Collectors.toSet()));
                    return userDto;
                })
                .collect(Collectors.toList());
    }

    
    @Override
    public ApplicationUserDto updateUser(Integer userId, ApplicationUserDto userDto) {
        ApplicationUser existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser != null) {
            // Update user fields with DTO values
            BeanUtils.copyProperties(userDto, existingUser, "userId");
            ApplicationUser updatedUser = userRepository.save(existingUser);
            ApplicationUserDto updatedUserDto = new ApplicationUserDto();
            BeanUtils.copyProperties(updatedUser, updatedUserDto);
            return updatedUserDto;
        }
        return null; 
    }

    @Override
    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}

