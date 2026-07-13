package com.wershop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customers")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@NoArgsConstructor
public class Customer extends User {
    // Thêm các trường đặc thù của Customer ở đây
    private String customerType; // Ví dụ: VIP, NORMAL
}
