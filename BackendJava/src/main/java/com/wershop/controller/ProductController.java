package com.wershop.controller;

import com.wershop.dto.request.ProductDto;
import com.wershop.dto.response.ApiResponse;
import com.wershop.entity.Product;
import com.wershop.security.UserDetailsImpl;
import com.wershop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<ApiResponse<List<Product>>> getActiveProducts() {
        return ResponseEntity.ok(ApiResponse.success("Success", productService.getActiveProducts()));
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
    public ResponseEntity<ApiResponse<List<Product>>> getSellerProducts() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(ApiResponse.success("Success", productService.getSellerProducts(userDetails.getId())));
    }
}
