package com.example.services;


import java.util.List;

import com.example.dto.PurchasesDto;

public interface PurchasesService {

    PurchasesDto createPurchase(PurchasesDto purchasesDTO);

    PurchasesDto updatePurchase(Long purchaseId, PurchasesDto purchasesDTO);

    void deletePurchase(Long purchaseId);

    PurchasesDto getPurchaseById(Long purchaseId);

    List<PurchasesDto> getAllPurchases();
    
    
    
}
