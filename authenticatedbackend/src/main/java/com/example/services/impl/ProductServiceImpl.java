package com.example.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.dto.ProductDto;
import com.example.mapper.ProductMapper;
import com.example.models.Category;
import com.example.models.Product;
import com.example.repository.CategoryRepository;
import com.example.repository.ProductRepository;
import com.example.services.ProductService;



@Service
public class ProductServiceImpl implements ProductService{

	
	private ProductRepository productRepository;
	private final  ProductMapper productMapper;
	private CategoryRepository categoryRepository;
	
	
	 public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper,CategoryRepository categoryRepository) {
	        this.productRepository = productRepository;
	        this.categoryRepository = categoryRepository;
	        this.productMapper = productMapper;
	    }


	@Override
	 public ProductDto createProduct(ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toDto(savedProduct);
    }
	
	@Override
    public ProductDto getProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return ProductMapper.toDto(product); // Map the product entity to a DTO
        } else {
            return null; // Or throw an exception or handle the case as appropriate
        }
    }
	
	@Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto productDTO) {
    	
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update existing product attributes with those from the DTO
        existingProduct.setPname(productDTO.getPname());
        existingProduct.setPurchasePrice(productDTO.getPurchasePrice());
        existingProduct.setSalePrice(productDTO.getSalePrice());
        existingProduct.setQuantity(productDTO.getQuantity());
        Category newCategory = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDTO.getCategoryId()));
        
        // Update the product's category
        existingProduct.setCategory(newCategory);

        // Save the updated product
        Product updatedProduct = productRepository.save(existingProduct);

        // Return the updated product DTO
        return ProductMapper.toDto(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        // Check if the product exists
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Delete the product
        productRepository.delete(existingProduct);
    }
    

    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryCategoryId(categoryId);
    }


	}
