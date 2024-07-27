package com.example.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.PurchasesDto;
import com.example.services.PurchasesService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/purchases")
public class PurchasesController {

    private final PurchasesService purchasesService;

    public PurchasesController(PurchasesService purchasesService) {
        this.purchasesService = purchasesService;
    }

    @PostMapping
    public ResponseEntity<PurchasesDto> createPurchase(@RequestBody PurchasesDto purchasesDTO) {
        PurchasesDto createdPurchase = purchasesService.createPurchase(purchasesDTO);
        return new ResponseEntity<>(createdPurchase, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchasesDto> updatePurchase(@PathVariable Long id, @RequestBody PurchasesDto purchasesDTO) {
        PurchasesDto updatedPurchase = purchasesService.updatePurchase(id, purchasesDTO);
        if (updatedPurchase != null) {
            return new ResponseEntity<>(updatedPurchase, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchase(@PathVariable Long id) {
        purchasesService.deletePurchase(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchasesDto> getPurchaseById(@PathVariable Long id) {
        PurchasesDto purchaseDTO = purchasesService.getPurchaseById(id);
        if (purchaseDTO != null) {
            return new ResponseEntity<>(purchaseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<PurchasesDto>> getAllPurchases() {
        List<PurchasesDto> purchases = purchasesService.getAllPurchases();
        return new ResponseEntity<>(purchases, HttpStatus.OK);
    }
}
