package com.wershop.dto.request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDto {
    private String name;
    private Long categoryId;
    private String description;
    private BigDecimal price;
    private BigDecimal salePrice;
    private Integer stock;
}
