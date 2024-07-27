package com.example.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.dto.CustomerDto;
import com.example.mapper.CustomerMapper;
import com.example.models.Customer;
import com.example.repository.CustomerRepository;
import com.example.services.CustomerService;



@Service
public class CustomerServiceImpl implements CustomerService{
	private final CustomerRepository customerRepository;

   
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerDto createCustomer(CustomerDto customerDto) {
        Customer customer = CustomerMapper.toEntity(customerDto);
        Customer savedCustomer = customerRepository.save(customer);
        return CustomerMapper.toDto(savedCustomer);
    }

    @Override
    public CustomerDto getCustomerById(Integer customerId) {
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
        return optionalCustomer.map(CustomerMapper::toDto).orElse(null);
    }

    @Override
    public List<CustomerDto> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(CustomerMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public CustomerDto updateCustomer(Integer customerId, CustomerDto customerDto) {
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
        if (optionalCustomer.isPresent()) {
            Customer existingCustomer = optionalCustomer.get();
            existingCustomer.setCname(customerDto.getCname());
            existingCustomer.setEmail(customerDto.getEmail());
            existingCustomer.setPhoneNo(customerDto.getPhoneNo());
            existingCustomer.setAddress(customerDto.getAddress());
            Customer updatedCustomer = customerRepository.save(existingCustomer);
            return CustomerMapper.toDto(updatedCustomer);
        }
        return null; // Or handle the case as appropriate
    }

    @Override
    public void deleteCustomer(Integer customerId) {
        customerRepository.deleteById(customerId);
    }
}
