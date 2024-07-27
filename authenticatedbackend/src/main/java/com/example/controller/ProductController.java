package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ProductDto;
import com.example.models.Product;
import com.example.services.ProductService;


@CrossOrigin("*")
@RestController
@RequestMapping("/admin/products")
public class ProductController {
	private final ProductService productService;

        public ProductController(ProductService productService) {
        this.productService = productService;
    }
        
        @PostMapping
        public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
            ProductDto createdProduct = productService.createProduct(productDto);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        }
        
        @GetMapping("/{id}")
        public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
            ProductDto productDto = productService.getProductById(id);
            if (productDto != null) {
                return new ResponseEntity<>(productDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @GetMapping
        public ResponseEntity<List<ProductDto>> getAllProducts() {
            List<ProductDto> products = productService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
            ProductDto updatedProduct = productService.updateProduct(id, productDto);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        @GetMapping("/category/{categoryId}")
        public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long categoryId) {
            List<Product> products = productService.getProductsByCategory(categoryId);
            return ResponseEntity.ok(products);
        }

}
