package com.example.services;

import java.util.List;

import com.example.dto.CustomerDto;


public interface CustomerService {
	 // Create a new customer
    CustomerDto createCustomer(CustomerDto customerDto);

    // Retrieve a customer by ID
    CustomerDto getCustomerById(Integer customerId);

    // Retrieve all customers
    List<CustomerDto> getAllCustomers();

    // Update an existing customer
    CustomerDto updateCustomer(Integer customerId, CustomerDto customerDto);

    // Delete a customer by ID
    void deleteCustomer(Integer customerId);
}
