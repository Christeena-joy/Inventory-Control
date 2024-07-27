package com.example.services.impl;


import org.springframework.stereotype.Service;

import com.example.dto.PurchasesDto;
import com.example.mapper.PurchasesMapper;
import com.example.models.Purchases;
import com.example.repository.PurchasesRepository;
import com.example.services.PurchasesService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PurchasesServiceImpl implements PurchasesService {

    private final PurchasesRepository purchasesRepository;
    private final PurchasesMapper purchasesMapper;

 
    public PurchasesServiceImpl(PurchasesRepository purchasesRepository, PurchasesMapper purchasesMapper) {
        this.purchasesRepository = purchasesRepository;
        this.purchasesMapper = purchasesMapper;
    }

    @Override
    public PurchasesDto createPurchase(PurchasesDto purchasesDto) {
        Purchases purchases = purchasesMapper.dtoToPurchases(purchasesDto);
        Purchases savedPurchase = purchasesRepository.save(purchases);
        return purchasesMapper.purchasesToDto(savedPurchase);
    }

    @Override
    public PurchasesDto updatePurchase(Long purchaseId, PurchasesDto purchasesDto) {
        Optional<Purchases> purchasesOptional = purchasesRepository.findById(purchaseId);
        if (purchasesOptional.isPresent()) {
            Purchases updatedPurchase = purchasesMapper.dtoToPurchases(purchasesDto); 
            updatedPurchase.setPurchaseId(purchaseId);
            // Save the updated purchase
            updatedPurchase = purchasesRepository.save(updatedPurchase);
            
            // Convert the saved purchase to DTO and return
            return purchasesMapper.purchasesToDto(updatedPurchase);
        } else {
            return null; // Handle case where purchase with given ID is not found
        }
    }


    @Override
    public void deletePurchase(Long purchaseId) {
        purchasesRepository.deleteById(purchaseId);
    }

    @Override
    public PurchasesDto getPurchaseById(Long purchaseId) {
        Optional<Purchases> purchaseOptional = purchasesRepository.findById(purchaseId);
        return purchaseOptional.map(purchasesMapper::purchasesToDto).orElse(null);
    }

    @Override
    public List<PurchasesDto> getAllPurchases() {
        List<Purchases> purchasesList = purchasesRepository.findAll();
        return purchasesList.stream()
                .map(purchasesMapper::purchasesToDto)
                .collect(Collectors.toList());
    }
}
