package com.wershop.service;

import com.wershop.dto.request.ProductDto;
import com.wershop.entity.Category;
import com.wershop.entity.Product;
import com.wershop.entity.Shop;
import com.wershop.exception.BusinessException;
import com.wershop.repository.CategoryRepository;
import com.wershop.repository.ProductRepository;
import com.wershop.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public Product createProduct(Long sellerId, ProductDto dto) {
        Shop shop = shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new BusinessException("Shop not found for seller"));
                
        if (!"APPROVED".equals(shop.getStatus())) {
            throw new BusinessException("Shop must be APPROVED to add products");
        }

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new BusinessException("Category not found"));

        String imagesJson = null;
        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            try {
                imagesJson = objectMapper.writeValueAsString(dto.getImages());
            } catch (JsonProcessingException e) {
                throw new BusinessException("Failed to process images");
            }
        }

        Product product = Product.builder()
                .shop(shop)
                .category(category)
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .salePrice(dto.getSalePrice())
                .stock(dto.getStock())
                .brand(dto.getBrand())
                .weight(dto.getWeight())
                .images(imagesJson)
                .status("PENDING_APPROVAL")
                .build();
                
        return productRepository.save(product);
    }
    
    public Page<Product> getActiveProducts(Pageable pageable) {
        return productRepository.findByStatus("ACTIVE", pageable);
    }
    
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new BusinessException("Product not found"));
    }
    
    public Page<Product> getActiveProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryIdAndStatus(categoryId, "ACTIVE", pageable);
    }
    
    public Page<Product> getSellerProducts(Long sellerId, Pageable pageable) {
        Shop shop = shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new BusinessException("Shop not found"));
        return productRepository.findByShopId(shop.getId(), pageable);
    }

    @Transactional
    public Product createProductAdmin(ProductDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new BusinessException("Category not found"));

        Shop shop = null;
        if (dto.getShopId() != null) {
            shop = shopRepository.findById(dto.getShopId())
                    .orElseThrow(() -> new BusinessException("Shop not found"));
        }

        String imagesJson = null;
        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            try {
                imagesJson = objectMapper.writeValueAsString(dto.getImages());
            } catch (JsonProcessingException e) {
                throw new BusinessException("Failed to process images");
            }
        }

        Product product = Product.builder()
                .shop(shop)
                .category(category)
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .salePrice(dto.getSalePrice())
                .stock(dto.getStock())
                .brand(dto.getBrand())
                .weight(dto.getWeight())
                .images(imagesJson)
                .status("ACTIVE") // Admin creates active products by default
                .build();

        return productRepository.save(product);
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Transactional
    public Product updateProductStatus(Long id, String status) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Product not found"));
        product.setStatus(status);
        return productRepository.save(product);
    }
}
