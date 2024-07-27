package com.example.mapper;


import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.example.dto.SalesDto;
import com.example.models.Customer;
import com.example.models.PaymentStatus;
import com.example.models.Sales;
import com.example.repository.CustomerRepository;
import com.example.repository.PaymentStatusRepository;

import java.util.Optional;

@Component
public class SalesMapper {

    private final CustomerRepository customerRepository;
    private final PaymentStatusRepository paymentStatusRepository;

    public SalesMapper(CustomerRepository customerRepository, PaymentStatusRepository paymentStatusRepository) {
        this.customerRepository = customerRepository;
        this.paymentStatusRepository = paymentStatusRepository;
    }

    public Sales dtoToEntity(SalesDto dto) {
        Sales entity = new Sales();
        BeanUtils.copyProperties(dto, entity);

        // Set Customer
        if (dto.getCustomerId() != null) {
            Optional<Customer> customerOptional = customerRepository.findById(dto.getCustomerId());
            customerOptional.ifPresent(entity::setCustomer);
        }

        // Set PaymentStatus
        if (dto.getPaymentStatusId() != null) {
            Optional<PaymentStatus> paymentStatusOptional = paymentStatusRepository.findById(dto.getPaymentStatusId());
            paymentStatusOptional.ifPresent(entity::setPaymentStatus);
        }

        return entity;
    }

    public SalesDto entityToDto(Sales entity) {
        SalesDto dto = new SalesDto();
        BeanUtils.copyProperties(entity, dto);

        // Set Customer ID
        if (entity.getCustomer() != null) {
            dto.setCustomerId(entity.getCustomer().getCustomerId());
        }

        // Set PaymentStatus ID
        if (entity.getPaymentStatus() != null) {
            dto.setPaymentStatusId(entity.getPaymentStatus().getStatusId());
        }

        return dto;
    }
}

