package com.example.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.PurchaseWithItemsDto;
import com.example.dto.PurchasesDto;
import com.example.models.PurchaseItem;
import com.example.services.PurchaseTransactionService;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/purchasetransaction")
public class PurchaseTransactionController {

    private final PurchaseTransactionService purchaseTransactionService;

    public PurchaseTransactionController(PurchaseTransactionService purchaseTransactionService) {
        this.purchaseTransactionService = purchaseTransactionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> processPurchase(@RequestBody PurchaseWithItemsDto purchaseWithItemsDto) {
        purchaseTransactionService.processPurchase(purchaseWithItemsDto.getPurchaseDto(), purchaseWithItemsDto.getPurchaseItems());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/update")
    public ResponseEntity<Void> updatePurchase(@RequestBody PurchasesDto purchaseDto, @RequestBody List<PurchaseItem> purchaseItems) {
        purchaseTransactionService.updatePurchase(purchaseDto, purchaseItems);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{purchaseId}")
    public ResponseEntity<PurchaseWithItemsDto> getPurchaseByIdWithItems(@PathVariable Long purchaseId) {
        PurchaseWithItemsDto purchaseWithItemsDto = purchaseTransactionService.getPurchaseByIdWithItems(purchaseId);
        return ResponseEntity.ok(purchaseWithItemsDto);
    }
}
