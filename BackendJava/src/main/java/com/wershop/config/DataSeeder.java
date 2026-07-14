package com.wershop.config;

import com.wershop.entity.Category;
import com.wershop.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedCategories();
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            List<String> defaultCategories = Arrays.asList(
                "Thời Trang Nam",
                "Điện Thoại",
                "Thiết Bị Điện Tử",
                "Máy Tính & Laptop",
                "Máy Ảnh",
                "Đồng Hồ",
                "Giày Dép Nam",
                "Thiết Bị Gia Dụng",
                "Thể Thao",
                "Ô Tô & Xe Máy"
            );

            for (String catName : defaultCategories) {
                Category category = Category.builder()
                        .name(catName)
                        .description("Danh mục " + catName)
                        .isActive(true)
                        .build();
                categoryRepository.save(category);
            }
            System.out.println("Default categories seeded!");
        }
    }
}
