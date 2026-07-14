package com.wershop.repository;
import com.wershop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);

    @Modifying
    @Query(value = "UPDATE users SET dtype = 'Seller', shop_name = :shopName, role_id = :roleId WHERE id = :userId", nativeQuery = true)
    void upgradeToSellerNative(@Param("userId") Long userId, @Param("shopName") String shopName, @Param("roleId") Long roleId);
}