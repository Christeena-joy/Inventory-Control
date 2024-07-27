package com.example.mapper;

import org.springframework.stereotype.Component;

import com.example.dto.CustomerDto;
import com.example.models.Customer;



@Component
public class CustomerMapper {
	public static CustomerDto toDto(Customer customer) {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setCustomerId(customer.getCustomerId());
        customerDto.setCname(customer.getCname());
        customerDto.setEmail(customer.getEmail());
        customerDto.setPhoneNo(customer.getPhoneNo());
        customerDto.setAddress(customer.getAddress());
        return customerDto;
    }

    public static Customer toEntity(CustomerDto customerDto) {
        Customer customer = new Customer();
        customer.setCustomerId(customerDto.getCustomerId());
        customer.setCname(customerDto.getCname());
        customer.setEmail(customerDto.getEmail());
        customer.setPhoneNo(customerDto.getPhoneNo());
        customer.setAddress(customerDto.getAddress());
        return customer;
    }

}
