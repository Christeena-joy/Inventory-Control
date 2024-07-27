package com.example.services;

import java.util.List;

import com.example.dto.ApplicationUserDto;

public interface ApplicationUserService {
	
	ApplicationUserDto getUserById(Integer userId);

    List<ApplicationUserDto> getAllUsers();

    ApplicationUserDto updateUser(Integer userId, ApplicationUserDto userDto);

    void deleteUser(Integer userId);
}
