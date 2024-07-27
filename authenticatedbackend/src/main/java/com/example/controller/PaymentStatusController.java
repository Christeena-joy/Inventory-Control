package com.example.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.models.PaymentStatus;
import com.example.services.PaymentStatusService;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("admin/payment-status")
public class PaymentStatusController {

    @Autowired
    private PaymentStatusService paymentStatusService;

    @GetMapping
    public ResponseEntity<List<PaymentStatus>> getAllPaymentStatuses() {
        List<PaymentStatus> paymentStatuses = paymentStatusService.getAllPaymentStatuses();
        return new ResponseEntity<>(paymentStatuses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentStatus> getPaymentStatusById(@PathVariable Long id) {
        Optional<PaymentStatus> paymentStatus = paymentStatusService.getPaymentStatusById(id);
        return paymentStatus.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<PaymentStatus> createPaymentStatus(@RequestBody PaymentStatus paymentStatus) {
        PaymentStatus createdPaymentStatus = paymentStatusService.createPaymentStatus(paymentStatus);
        return new ResponseEntity<>(createdPaymentStatus, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentStatus> updatePaymentStatus(@PathVariable Long id, @RequestBody PaymentStatus updatedPaymentStatus) {
        PaymentStatus paymentStatus = paymentStatusService.updatePaymentStatus(id, updatedPaymentStatus);
        return paymentStatus != null ? new ResponseEntity<>(paymentStatus, HttpStatus.OK) :
                                       new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentStatus(@PathVariable Long id) {
        paymentStatusService.deletePaymentStatus(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
