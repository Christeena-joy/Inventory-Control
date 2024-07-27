package com.example.mapper;


import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.example.dto.ProductDto;
import com.example.models.Category;
import com.example.models.Product;
import com.example.repository.CategoryRepository;


@Component
public class ProductMapper {
	
	 private final CategoryRepository categoryRepository; // Inject Category repository

	    public ProductMapper(CategoryRepository categoryRepository) {
	        this.categoryRepository = categoryRepository;
	    }
	public static ProductDto toDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setPid(product.getPid());
        productDto.setPname(product.getPname());
        productDto.setCategoryId(product.getCategory().getCategoryId()); 
        productDto.setPurchasePrice(product.getPurchasePrice()); 
        productDto.setSalePrice(product.getSalePrice());
        productDto.setQuantity(product.getQuantity());
        return productDto;
    }

    public Product toEntity(ProductDto productDto) {
        Product product = new Product();
        product.setPid(productDto.getPid());
        product.setPname(productDto.getPname());
        //  handle the conversion of category ID to Category entity
        Optional<Category> optionalCategory = categoryRepository.findById(productDto.getCategoryId());
        Category category = optionalCategory.orElseThrow(() -> new NoSuchElementException("Category not found with ID: " + productDto.getCategoryId()));

        product.setCategory(category);

        product.setPurchasePrice(productDto.getPurchasePrice()); // New field
        product.setSalePrice(productDto.getSalePrice()); // New field
        product.setQuantity(productDto.getQuantity());
        return product;
    }
}
