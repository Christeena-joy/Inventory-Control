package com.example.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.models.PurchaseItem;
import com.example.repository.PurchaseItemRepository;
import com.example.services.PurchaseItemService;

@Service
public class PurchaseItemServiceImpl implements PurchaseItemService {

    private final PurchaseItemRepository purchaseItemRepository;

    public PurchaseItemServiceImpl(PurchaseItemRepository purchaseItemRepository) {
        this.purchaseItemRepository = purchaseItemRepository;
    }

    @Override
    public PurchaseItem createPurchaseItem(PurchaseItem purchaseItem) {
        return purchaseItemRepository.save(purchaseItem);
    }

    @Override
    public PurchaseItem updatePurchaseItem(Long purchaseItemId, PurchaseItem updatedPurchaseItem) {
        PurchaseItem existingPurchaseItem = purchaseItemRepository.findById(purchaseItemId)
                .orElseThrow(() -> new RuntimeException("PurchaseItem not found with id: " + purchaseItemId));
        existingPurchaseItem.setProduct(updatedPurchaseItem.getProduct());
        existingPurchaseItem.setCategory(updatedPurchaseItem.getCategory());
        existingPurchaseItem.setQuantity(updatedPurchaseItem.getQuantity());
        existingPurchaseItem.setTotalAmount(updatedPurchaseItem.getTotalAmount());
        return purchaseItemRepository.save(existingPurchaseItem);
    }

    @Override
    public List<PurchaseItem> getPurchaseItemsByPurchaseId(Long purchaseId) {
        return purchaseItemRepository.findByPurchasePurchaseId(purchaseId);
    }

    @Override
    public void deletePurchaseItem(Long purchaseItemId) {
        purchaseItemRepository.deleteById(purchaseItemId);
    }

    @Override
    public PurchaseItem createOrUpdatePurchaseItem(PurchaseItem purchaseItem) {
        if (purchaseItem.getPurchaseItemId() != null) {
            return updatePurchaseItem(purchaseItem.getPurchaseItemId(), purchaseItem);
        } else {
            return createPurchaseItem(purchaseItem);
        }
    }
}
