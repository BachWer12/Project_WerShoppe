package com.wershop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sellers")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@NoArgsConstructor
public class Seller extends User {
    @Column(nullable = false)
    private String shopName;
    private String shopDescription;
    private String taxId;
}
