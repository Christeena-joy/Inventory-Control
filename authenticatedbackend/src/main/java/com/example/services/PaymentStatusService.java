package com.example.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.PaymentStatus;
import com.example.repository.PaymentStatusRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentStatusService {

    @Autowired
    private PaymentStatusRepository paymentStatusRepository;

    public List<PaymentStatus> getAllPaymentStatuses() {
        return paymentStatusRepository.findAll();
    }

    public Optional<PaymentStatus> getPaymentStatusById(Long id) {
        return paymentStatusRepository.findById(id);
    }

    public PaymentStatus createPaymentStatus(PaymentStatus paymentStatus) {
        return paymentStatusRepository.save(paymentStatus);
    }

    public PaymentStatus updatePaymentStatus(Long id, PaymentStatus updatedPaymentStatus) {
        if (paymentStatusRepository.existsById(id)) {
            updatedPaymentStatus.setStatusId(id);
            return paymentStatusRepository.save(updatedPaymentStatus);
        }
        return null; // Handle not found case
    }

    public void deletePaymentStatus(Long id) {
        paymentStatusRepository.deleteById(id);
    }
}

