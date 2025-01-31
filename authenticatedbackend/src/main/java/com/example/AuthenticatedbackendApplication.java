package com.example;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.models.ApplicationUser;
import com.example.models.Role;
import com.example.repository.RoleRepository;
import com.example.repository.UserRepository;

@SpringBootApplication
public class AuthenticatedbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticatedbackendApplication.class, args);
	}
	
	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncode){
		return args ->{
			if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);

			ApplicationUser admin = new ApplicationUser(1, "admin", passwordEncode.encode("password"),"admin@gmail.com","175446553", roles);

			userRepository.save(admin);
		};
	}

}
