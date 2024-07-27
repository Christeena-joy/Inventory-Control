package com.example.services;

import java.util.List;

import com.example.models.SaleItem;


public interface SaleItemService {
    SaleItem createSaleItem(SaleItem saleItem);
    SaleItem updateSaleItem(Long saleItemId, SaleItem saleItem);
    List<SaleItem> getSaleItemsBySaleId(Integer saleId);
    void deleteSaleItem(Long saleItemId);
	SaleItem createOrUpdateSaleItem(SaleItem saleItem);
}
