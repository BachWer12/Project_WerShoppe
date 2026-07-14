package com.wershop.repository;
import com.wershop.entity.RefreshToken;
import com.wershop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    @Modifying(clearAutomatically = true)
    @org.springframework.data.jpa.repository.Query("DELETE FROM RefreshToken r WHERE r.user = ?1")
    int deleteByUser(User user);
}