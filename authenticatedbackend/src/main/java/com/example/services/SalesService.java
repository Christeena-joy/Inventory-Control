package com.example.services;


import java.util.List;

import com.example.dto.SalesDto;

public interface SalesService {

    SalesDto createSale(SalesDto salesDto);

    SalesDto updateSale(Integer saleId, SalesDto salesDto);

    void deleteSale(Integer saleId);

    SalesDto getSaleById(Integer saleId);

    List<SalesDto> getAllSales();
}
