package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.dto.SaleWithItemsDto;
import com.example.dto.SalesDto;
import com.example.mapper.SalesMapper;
import com.example.models.Category;
import com.example.models.Product;
import com.example.models.SaleItem;
import com.example.models.Sales;
import com.example.repository.CategoryRepository;
import com.example.repository.ProductRepository;
import com.example.repository.SaleItemRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;


@Service
@Transactional
public class SaleTransactionService {

    private final SalesService saleService;
    private final SaleItemService saleItemService;
    private final SalesMapper salesMapper;
    private final ProductRepository productRepository;
    private final SaleItemRepository saleItemRepository;
    private final CategoryRepository categoryRepository;


    public SaleTransactionService(SalesService saleService, SaleItemService saleItemService, SalesMapper salesMapper,ProductRepository productRepository,SaleItemRepository saleItemRepository, CategoryRepository categoryRepository) {
        this.saleService = saleService;
        this.saleItemService = saleItemService;
        this.salesMapper = salesMapper;
        this.productRepository = productRepository;
		this.saleItemRepository = saleItemRepository;
		this.categoryRepository = categoryRepository;
    }


    public void processSale(SalesDto saleDto, List<SaleItem> saleItems) {
        // Create the overall sale and save it
        SalesDto createdSale = saleService.createSale(saleDto);
        Sales sale = salesMapper.dtoToEntity(createdSale);
        // You've already saved the sale in createSale, no need to save it explicitly here.

        // Associate each sale item with the created sale
        for (SaleItem saleItem : saleItems) {
            saleItem.setSale(sale);
            // Fetch the product from the database based on the product ID
            Product product = productRepository.findById(saleItem.getProduct().getPid())
                                                .orElseThrow();

            // Fetch the category from the database based on the category ID
            Optional<Category> categoryOptional = categoryRepository.findById(saleItem.getCategory().getCategoryId());

            // Check if the category exists in the optional
            if (categoryOptional.isPresent()) {
                // Category found, extract it from the optional
                Category category = categoryOptional.get();
                saleItem.setCategory(category);
            } else {
                // Handle the case when the category is not found
                // You can throw an exception, log an error, or handle it in any appropriate way
                throw new EntityNotFoundException("Category not found for sale item: " + saleItem);
            }
            saleItem.setProduct(product);
            saleItemRepository.save(saleItem);
        }
    }

    
    public void updateSale(SalesDto saleDto, List<SaleItem> saleItems) {
        
        // Update the sale
        saleService.updateSale(saleDto.getSaleId(), saleDto);
        Sales sale=salesMapper.dtoToEntity(saleDto);
        
        // Update or create sale items
        for (SaleItem saleItem : saleItems) {
            saleItem.setSale(sale);
            saleItemService.createOrUpdateSaleItem(saleItem);
        }
    }

    public SaleWithItemsDto getSaleByIdWithItems(Integer saleId) {
        SalesDto saleDto = saleService.getSaleById(saleId);
        List<SaleItem> saleItems = saleItemService.getSaleItemsBySaleId(saleId);
        
        SaleWithItemsDto saleWithItemsDto = new SaleWithItemsDto();
        saleWithItemsDto.setSaleDto(saleDto);
        saleWithItemsDto.setSaleItems(saleItems);
        
        return saleWithItemsDto;
    }
    

}
