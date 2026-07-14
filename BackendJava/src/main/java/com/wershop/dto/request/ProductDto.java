package com.wershop.dto.request;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDto {
    private String name;
    private Long categoryId;
    private String description;
    private BigDecimal price;
    private BigDecimal salePrice;
    private Integer stock;
    
    private String brand;
    private Double weight;
    private List<String> images;
    
    private Long shopId;
}
