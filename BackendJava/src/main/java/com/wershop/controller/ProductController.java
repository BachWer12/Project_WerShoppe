package com.wershop.controller;

import com.wershop.dto.request.ProductDto;
import com.wershop.dto.response.ApiResponse;
import com.wershop.entity.Product;
import com.wershop.security.UserDetailsImpl;
import com.wershop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<Page<Product>>> getActiveProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Long categoryId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        if (categoryId != null) {
            return ResponseEntity.ok(ApiResponse.success("Success", productService.getActiveProductsByCategory(categoryId, pageable)));
        }
        return ResponseEntity.ok(ApiResponse.success("Success", productService.getActiveProducts(pageable)));
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success("Success", product));
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping
    public ResponseEntity<ApiResponse<Product>> createProduct(@RequestBody ProductDto dto) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Product product = productService.createProduct(userDetails.getId(), dto);
        return ResponseEntity.ok(ApiResponse.success("Product created", product));
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller")
    public ResponseEntity<ApiResponse<Page<Product>>> getSellerProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return ResponseEntity.ok(ApiResponse.success("Success", productService.getSellerProducts(userDetails.getId(), pageable)));
    }
}
