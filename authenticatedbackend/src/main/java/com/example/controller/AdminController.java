package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ApplicationUserDto;
import com.example.services.ApplicationUserService;

@RestController
@RequestMapping("/admin/users")
@CrossOrigin("*")
public class AdminController {
    
    private final ApplicationUserService userService;

    public AdminController(ApplicationUserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<ApplicationUserDto> getUserById(@PathVariable Integer userId) {
        ApplicationUserDto userDto = userService.getUserById(userId);
        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ApplicationUserDto>> getAllUsers() {
        List<ApplicationUserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApplicationUserDto> updateUser(@PathVariable Integer userId, @RequestBody ApplicationUserDto userDto) {
        ApplicationUserDto updatedUser = userService.updateUser(userId, userDto);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build(); // Handle user not found scenario
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
