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

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public Product createProduct(Long sellerId, ProductDto dto) {
        Shop shop = shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new BusinessException("Shop not found for seller"));
                
        if (!"APPROVED".equals(shop.getStatus())) {
            throw new BusinessException("Shop must be APPROVED to add products");
        }

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new BusinessException("Category not found"));

        Product product = Product.builder()
                .shop(shop)
                .category(category)
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .salePrice(dto.getSalePrice())
                .stock(dto.getStock())
                .status("PENDING_APPROVAL")
                .build();
                
        return productRepository.save(product);
    }
    
    public List<Product> getActiveProducts() {
        return productRepository.findByStatus("ACTIVE");
    }
    
    public List<Product> getSellerProducts(Long sellerId) {
        Shop shop = shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new BusinessException("Shop not found"));
        return productRepository.findByShopId(shop.getId());
    }
}
