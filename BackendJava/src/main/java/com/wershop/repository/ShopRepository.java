package com.wershop.repository;

import com.wershop.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findBySellerId(Long sellerId);
    Optional<Shop> findByName(String name);
}
