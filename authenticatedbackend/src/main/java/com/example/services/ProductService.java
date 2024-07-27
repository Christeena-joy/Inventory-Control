package com.example.services;

import java.util.List;

import com.example.dto.ProductDto;
import com.example.models.Product;


public interface ProductService {
	
	// Create a new product
    ProductDto createProduct(ProductDto productDTO);

   // Retrieve a product by its ID
    ProductDto getProductById(Long id);

    // Retrieve all products
    List<ProductDto> getAllProducts();

    // Update an existing product
    ProductDto updateProduct(Long id, ProductDto productDTO);

    // Delete a product by its ID
    void deleteProduct(Long id);
    
    List<Product> getProductsByCategory(Long categoryId);

}
