package com.wershop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admins")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter
@NoArgsConstructor
public class Admin extends User {
    private String department;
}
