package com.example.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.models.SaleItem;
import com.example.repository.SaleItemRepository;
import com.example.services.SaleItemService;




@Service
public class SaleItemServiceImpl implements SaleItemService {

    private final SaleItemRepository saleItemRepository;

    public SaleItemServiceImpl(SaleItemRepository saleItemRepository) {
        this.saleItemRepository = saleItemRepository;
    }

    @Override
    public SaleItem createSaleItem(SaleItem saleItem) {
    	
        return saleItemRepository.save(saleItem);
    }

    @Override
    public SaleItem updateSaleItem(Long saleItemId, SaleItem saleItem) {
        SaleItem existingSaleItem = saleItemRepository.findById(saleItemId).orElse(null);
        if (existingSaleItem != null) {
            // Update sale item fields with new values
            existingSaleItem.setProduct(saleItem.getProduct());
            existingSaleItem.setCategory(saleItem.getCategory());
            existingSaleItem.setQuantity(saleItem.getQuantity());
            existingSaleItem.setTotalAmount(saleItem.getTotalAmount());
            return saleItemRepository.save(existingSaleItem);
        }
        return null; // Handle sale item not found scenario
    }

    @Override
    public List<SaleItem> getSaleItemsBySaleId(Integer saleId) {
        return saleItemRepository.findBySaleSaleId(saleId);
    }

    @Override
    public void deleteSaleItem(Long saleItemId) {
        saleItemRepository.deleteById(saleItemId);
    }
    
    @Override
    public SaleItem createOrUpdateSaleItem(SaleItem saleItem) {
        // Check if the saleItem has an ID
        if (saleItem.getSaleItemId() != null) {
            // If it has an ID, update the sale item
            return updateSaleItem(saleItem.getSaleItemId(), saleItem);
        } else {
            // If it doesn't have an ID, create a new sale item
            return createSaleItem(saleItem);
        }
    }

}
