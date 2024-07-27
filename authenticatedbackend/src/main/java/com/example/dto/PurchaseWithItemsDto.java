package com.example.dto;


import java.util.List;

import com.example.models.PurchaseItem;

public class PurchaseWithItemsDto {
    private PurchasesDto purchaseDto;
    private List<PurchaseItem> purchaseItems;

    public PurchaseWithItemsDto(PurchasesDto purchaseDto, List<PurchaseItem> purchaseItems) {
        this.purchaseDto = purchaseDto;
        this.purchaseItems = purchaseItems;
    }

    public PurchaseWithItemsDto() {
        // Empty constructor for serialization frameworks like Jackson
    }

    public PurchasesDto getPurchaseDto() {
        return purchaseDto;
    }

    public void setPurchaseDto(PurchasesDto purchaseDto) {
        this.purchaseDto = purchaseDto;
    }

    public List<PurchaseItem> getPurchaseItems() {
        return purchaseItems;
    }

    public void setPurchaseItems(List<PurchaseItem> purchaseItems) {
        this.purchaseItems = purchaseItems;
    }
}
