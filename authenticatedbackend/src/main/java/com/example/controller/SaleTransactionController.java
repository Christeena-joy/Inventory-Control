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

import com.example.dto.SaleWithItemsDto;
import com.example.dto.SalesDto;
import com.example.models.SaleItem;
import com.example.services.SaleTransactionService;


@CrossOrigin("*")
@RestController
@RequestMapping("/user/saletransaction")
public class SaleTransactionController {

    private final SaleTransactionService saleTransactionService;

    public SaleTransactionController(SaleTransactionService saleTransactionService) {
        this.saleTransactionService = saleTransactionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> processSale(@RequestBody SaleWithItemsDto saleWithItemsDto) {
        saleTransactionService.processSale(saleWithItemsDto.getSaleDto(), saleWithItemsDto.getSaleItems());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PostMapping("/update")
    public ResponseEntity<Void> updateSale(@RequestBody SalesDto saleDto, @RequestBody List<SaleItem> saleItems) {
        saleTransactionService.updateSale(saleDto, saleItems);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{saleId}")
    public ResponseEntity<SaleWithItemsDto> getSaleByIdWithItems(@PathVariable Integer saleId) {
        SaleWithItemsDto saleWithItemsDto = saleTransactionService.getSaleByIdWithItems(saleId);
        return ResponseEntity.ok(saleWithItemsDto);
    }
}
