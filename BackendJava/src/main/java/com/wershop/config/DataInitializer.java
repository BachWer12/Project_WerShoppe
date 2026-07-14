package com.wershop.config;

import com.wershop.entity.Admin;
import com.wershop.entity.Role;
import com.wershop.entity.RoleName;
import com.wershop.repository.AdminRepository;
import com.wershop.repository.RoleRepository;
import com.wershop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.wershop.entity.Category;
import com.wershop.repository.CategoryRepository;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        Arrays.stream(RoleName.values()).forEach(roleName -> {
            if (roleRepository.findByName(roleName).isEmpty()) {
                roleRepository.save(Role.builder().name(roleName).build());
            }
        });

        String adminEmail = "admin@gmail.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            Admin admin = new Admin();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setFullName("Super Admin");
            admin.setDepartment("System Administration");
            admin.setStatus("ACTIVE");
            admin.setEnabled(true);
            admin.setEmailVerified(true);
            
            Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role ADMIN is not found."));
            admin.setRole(adminRole);
            
            adminRepository.save(admin);
            System.out.println("Default admin created: " + adminEmail + " / 123456");
        }

        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                Category.builder().name("Electronics").slug("electronics").description("Electronic items").isActive(true).build(),
                Category.builder().name("Clothing").slug("clothing").description("Clothes and apparel").isActive(true).build(),
                Category.builder().name("Home & Garden").slug("home-garden").description("Home stuff").isActive(true).build()
            );
            categoryRepository.saveAll(categories);
            System.out.println("Default categories created");
        }
    }
}
