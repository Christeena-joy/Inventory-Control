package com.example.services.impl;


import org.springframework.stereotype.Service;

import com.example.dto.SalesDto;
import com.example.mapper.SalesMapper;
import com.example.models.Sales;
import com.example.repository.SalesRepository;
import com.example.services.SalesService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SalesServiceImpl implements SalesService {

    private final SalesRepository salesRepository;
    private final SalesMapper salesMapper;

    public SalesServiceImpl(SalesRepository salesRepository, SalesMapper salesMapper) {
        this.salesRepository = salesRepository;
        this.salesMapper = salesMapper;
    }

    @Override
    public SalesDto createSale(SalesDto salesDto) {
        Sales sales = salesMapper.dtoToEntity(salesDto);
        Sales savedSale = salesRepository.save(sales);
        return salesMapper.entityToDto(savedSale);
    }

    @Override
    public SalesDto updateSale(Integer saleId, SalesDto salesDto) {
        Optional<Sales> optionalSale = salesRepository.findById(saleId);
        if (optionalSale.isPresent()) {
                        
            // Update the existing sale entity with data from the DTO
            Sales updatedSale = salesMapper.dtoToEntity(salesDto);
            updatedSale.setSaleId(saleId); // Ensure the ID is set correctly
            
            // Set Customer and PaymentStatus if needed
            // updatedSale.setCustomer(customer);
            // updatedSale.setPaymentStatus(paymentStatus);
            
            updatedSale = salesRepository.save(updatedSale);
            return salesMapper.entityToDto(updatedSale);
        } else {
            // Handle case where sale with given ID is not found
            return null;
        }
    }


    @Override
    public void deleteSale(Integer saleId) {
        salesRepository.deleteById(saleId);
    }

    @Override
    public SalesDto getSaleById(Integer saleId) {
        Optional<Sales> optionalSale = salesRepository.findById(saleId);
        return optionalSale.map(salesMapper::entityToDto).orElse(null);
    }

    @Override
    public List<SalesDto> getAllSales() {
        List<Sales> salesList = salesRepository.findAll();
        return salesList.stream().map(salesMapper::entityToDto).collect(Collectors.toList());
    }
}
