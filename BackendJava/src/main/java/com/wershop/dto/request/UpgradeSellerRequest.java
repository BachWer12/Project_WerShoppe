package com.wershop.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpgradeSellerRequest {
    @NotBlank
    private String shopName;
}
