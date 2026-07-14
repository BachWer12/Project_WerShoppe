package com.wershop.controller;

import com.wershop.dto.request.AdminCreationRequest;
import com.wershop.dto.request.ProductDto;
import com.wershop.dto.response.ApiResponse;
import com.wershop.entity.Category;
import com.wershop.entity.Product;
import com.wershop.repository.CategoryRepository;
import com.wershop.service.ProductService;
import com.wershop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Void>> createAdmin(@Valid @RequestBody AdminCreationRequest request) {
        userService.createAdmin(request);
        return ResponseEntity.ok(ApiResponse.success("Admin created successfully!", null));
    }

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<Page<Product>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return ResponseEntity.ok(ApiResponse.success("Success", productService.getAllProducts(pageable)));
    }

    @PostMapping("/products")
    public ResponseEntity<ApiResponse<Product>> createProductAdmin(@RequestBody ProductDto dto) {
        Product product = productService.createProductAdmin(dto);
        return ResponseEntity.ok(ApiResponse.success("Product created successfully", product));
    }

    @PutMapping("/products/{id}/status")
    public ResponseEntity<ApiResponse<Product>> updateProductStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Product product = productService.updateProductStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Product status updated", product));
    }

    @PostMapping("/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(ApiResponse.success("Category created", categoryRepository.save(category)));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());
        category.setImageUrl(categoryDetails.getImageUrl());
        category.setIsActive(categoryDetails.getIsActive());
        return ResponseEntity.ok(ApiResponse.success("Category updated", categoryRepository.save(category)));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted", null));
    }
}
