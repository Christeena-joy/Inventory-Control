package com.example.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import com.example.utils.RSAKeyProperties;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
public class SecurityConfiguration {

	 private final RSAKeyProperties keys;

	    public SecurityConfiguration(RSAKeyProperties keys){
	        this.keys = keys;
	    } 
	@Bean
	    public PasswordEncoder passwordEncoder(){
	        return new BCryptPasswordEncoder();
	    }
	    
	    @Bean
	    public AuthenticationManager authManager(UserDetailsService detailsService){
	        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
	        daoProvider.setUserDetailsService(detailsService);
	        daoProvider.setPasswordEncoder(passwordEncoder());
	        return new ProviderManager(daoProvider);
	    }


	@Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests((requests)->{
                requests.requestMatchers("/auth/**","/h2-console/**").permitAll();
                requests.requestMatchers("/admin/**").hasRole("ADMIN");
                requests.requestMatchers("/user/**").hasAnyRole("ADMIN","USER");
                requests.anyRequest().authenticated();
                });
        http
                .oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(jwtAuthenticationConverter());
        http
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.headers().frameOptions().disable();
        return http.build();
    }
	
	 @Bean
	    public JwtDecoder jwtDecoder(){
	        return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();
	    }
	 
	 @Bean
	    public JwtEncoder jwtEncoder(){
	        JWK jwk = new RSAKey.Builder(keys.getPublicKey()).privateKey(keys.getPrivateKey()).build();
	        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
	        return new NimbusJwtEncoder(jwks);
	    }
	 @Bean
	    public JwtAuthenticationConverter jwtAuthenticationConverter(){
	        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
	        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
	        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
	        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
	        jwtConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
	        return jwtConverter;
	    }
}