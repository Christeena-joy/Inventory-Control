package com.example.mapper;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.example.dto.PurchasesDto;
import com.example.models.PaymentStatus;
import com.example.models.Purchases;
import com.example.models.Supplier;
import com.example.repository.PaymentStatusRepository;
import com.example.repository.SupplierRepository;

@Component
public class PurchasesMapper {
	
    private final SupplierRepository supplierRepository;
    private final PaymentStatusRepository paymentStatusRepository;

    public PurchasesMapper(SupplierRepository supplierRepository,
                                PaymentStatusRepository paymentStatusRepository) {
        
        this.supplierRepository = supplierRepository;
        this.paymentStatusRepository = paymentStatusRepository;
    }

	public PurchasesDto purchasesToDto(Purchases purchases) {
        PurchasesDto dto = new PurchasesDto();
        dto.setPurchaseId(purchases.getPurchaseId());
        dto.setSid(purchases.getSupplier().getSid());
        dto.setDate(purchases.getDate());
        dto.setTotalItemQuantity(purchases.getTotalItemQuantity());
        dto.setTotalAmount(purchases.getTotalAmount());
        dto.setPaymentStatusId(purchases.getPaymentStatus().getStatusId());
        dto.setItemDeliveryStatus(purchases.isItemDeliveryStatus());
        return dto;
    }

    public Purchases dtoToPurchases(PurchasesDto dto) {
        Purchases purchases = new Purchases();
        BeanUtils.copyProperties(dto, purchases);
        
        if (dto.getPurchaseId() == null) {
            System.out.println("Purchase ID is null. It may not have been fetched properly.");
        } else {
            purchases.setPurchaseId(dto.getPurchaseId());
        }

        
     // Set Supplier
        if (dto.getSid() != null) {
            Optional<Supplier> supplierOptional = supplierRepository.findById(dto.getSid());
            supplierOptional.ifPresent(purchases::setSupplier);
        }

        // Set PaymentStatus
        if (dto.getPaymentStatusId() != null) {
            Optional<PaymentStatus> paymentStatusOptional = paymentStatusRepository.findById(dto.getPaymentStatusId());
            paymentStatusOptional.ifPresent(purchases::setPaymentStatus);
        }
        
        return purchases;
    }

}

