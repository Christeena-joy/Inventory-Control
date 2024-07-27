package com.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.dto.PurchaseWithItemsDto;
import com.example.dto.PurchasesDto;
import com.example.mapper.PurchasesMapper;
import com.example.models.Category;
import com.example.models.Product;
import com.example.models.PurchaseItem;
import com.example.models.Purchases;
import com.example.repository.CategoryRepository;
import com.example.repository.ProductRepository;
import com.example.repository.PurchaseItemRepository;
import com.example.repository.PurchasesRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class PurchaseTransactionService {

    private final PurchasesService purchasesService;
    private final PurchaseItemService purchaseItemService;
    private final PurchasesMapper purchaseMapper;
    private final ProductRepository productRepository;
    private final PurchaseItemRepository purchaseItemRepository;
    private final CategoryRepository categoryRepository;
    private final PurchasesRepository purchasesRepository;

    public PurchaseTransactionService(
            PurchasesService purchasesService,
            PurchaseItemService purchaseItemService,
            PurchasesMapper purchaseMapper,
            ProductRepository productRepository,
            PurchaseItemRepository purchaseItemRepository,
            CategoryRepository categoryRepository,
            PurchasesRepository purchasesRepository) {
        this.purchasesService = purchasesService;
        this.purchaseItemService = purchaseItemService;
        this.purchaseMapper = purchaseMapper;
        this.productRepository = productRepository;
        this.purchaseItemRepository = purchaseItemRepository;
        this.categoryRepository = categoryRepository;
		this.purchasesRepository = purchasesRepository;
    }

    public void processPurchase(PurchasesDto purchaseDto, List<PurchaseItem> purchaseItems) {
        // Create the overall purchase and save it
        PurchasesDto createdPurchase = purchasesService.createPurchase(purchaseDto);
        Purchases purchase = purchaseMapper.dtoToPurchases(createdPurchase);

     // Ensure the purchase's purchaseItems list is initialized
        if (purchase.getPurchaseItems() == null) {
            purchase.setPurchaseItems(new ArrayList<>());
        }
        // Associate each purchase item with the created purchase
        for (PurchaseItem purchaseItem : purchaseItems) {
            purchaseItem.setPurchase(purchase);

            // Fetch the product from the database based on the product ID
            Product product = productRepository.findById(purchaseItem.getProduct().getPid())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

            purchaseItem.setProduct(product);
            
            // Fetch the category from the database based on the category ID
            Optional<Category> categoryOptional = categoryRepository.findById(purchaseItem.getCategory().getCategoryId());

            // Check if the category exists in the optional
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                purchaseItem.setCategory(category);
            } else {
                throw new EntityNotFoundException("Category not found for purchase item: " + purchaseItem);
            }

            purchaseItemRepository.save(purchaseItem);
            
            purchase.getPurchaseItems().add(purchaseItem);
        }
        purchasesRepository.save(purchase);
    }

    public void updatePurchase(PurchasesDto purchaseDto, List<PurchaseItem> purchaseItems) {
        // Update the purchase
        purchasesService.updatePurchase(purchaseDto.getPurchaseId(), purchaseDto);
        Purchases purchase = purchaseMapper.dtoToPurchases(purchaseDto);

        // Update or create purchase items
        for (PurchaseItem purchaseItem : purchaseItems) {
            purchaseItem.setPurchase(purchase);
            purchaseItemService.createOrUpdatePurchaseItem(purchaseItem);
        }
    }

    public PurchaseWithItemsDto getPurchaseByIdWithItems(Long purchaseId) {
        PurchasesDto purchaseDto = purchasesService.getPurchaseById(purchaseId);
        List<PurchaseItem> purchaseItems = purchaseItemService.getPurchaseItemsByPurchaseId(purchaseId);
        
        PurchaseWithItemsDto purchaseWithItemsDto = new PurchaseWithItemsDto();
        purchaseWithItemsDto.setPurchaseDto(purchaseDto);
        purchaseWithItemsDto.setPurchaseItems(purchaseItems);
        
        return purchaseWithItemsDto;
    }
}

