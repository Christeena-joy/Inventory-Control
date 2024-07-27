package com.example.services;

import java.util.List;

import com.example.models.PurchaseItem;

public interface PurchaseItemService {
    PurchaseItem createPurchaseItem(PurchaseItem purchaseItem);
    PurchaseItem updatePurchaseItem(Long purchaseItemId, PurchaseItem purchaseItem);
    List<PurchaseItem> getPurchaseItemsByPurchaseId(Long purchaseId);
    void deletePurchaseItem(Long purchaseItemId);
    PurchaseItem createOrUpdatePurchaseItem(PurchaseItem purchaseItem);
}
