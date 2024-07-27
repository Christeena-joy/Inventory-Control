package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.models.Category;



public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(Long id);
    Category updateCategory(Category category);
    Category createCategory(Category category);
    void deleteCategoryById(Long id);
}