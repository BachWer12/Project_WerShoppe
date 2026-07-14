package com.wershop.repository;

import com.wershop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByShopId(Long shopId, Pageable pageable);
    Page<Product> findByStatus(String status, Pageable pageable);
    Page<Product> findByCategoryIdAndStatus(Long categoryId, String status, Pageable pageable);
}
