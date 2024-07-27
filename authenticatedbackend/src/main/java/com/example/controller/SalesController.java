package com.example.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.SalesDto;
import com.example.services.SalesService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/user/sales")
public class SalesController {

    private final SalesService salesService;

    public SalesController(SalesService salesService) {
        this.salesService = salesService;
    }

    @PostMapping
    public ResponseEntity<SalesDto> createSale(@RequestBody SalesDto salesDto) {
        SalesDto createdSale = salesService.createSale(salesDto);
        return new ResponseEntity<>(createdSale, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesDto> getSaleById(@PathVariable Integer id) {
        SalesDto saleDto = salesService.getSaleById(id);
        if (saleDto != null) {
            return new ResponseEntity<>(saleDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<SalesDto>> getAllSales() {
        List<SalesDto> salesList = salesService.getAllSales();
        return new ResponseEntity<>(salesList, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalesDto> updateSale(@PathVariable Integer id, @RequestBody SalesDto salesDto) {
        SalesDto updatedSale = salesService.updateSale(id, salesDto);
        if (updatedSale != null) {
            return new ResponseEntity<>(updatedSale, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Integer id) {
        salesService.deleteSale(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
