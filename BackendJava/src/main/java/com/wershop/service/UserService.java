package com.wershop.service;

import com.wershop.dto.request.AdminCreationRequest;
import com.wershop.dto.response.UserResponse;
import com.wershop.entity.*;
import com.wershop.exception.ConflictException;
import com.wershop.repository.AdminRepository;
import com.wershop.repository.RoleRepository;
import com.wershop.repository.UserRepository;
import com.wershop.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private SellerRepository sellerRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder encoder;

    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole().getName().name());
        return response;
    }

    @Transactional
    public void createAdmin(AdminCreationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Error: Email is already in use!");
        }
        Admin admin = new Admin();
        admin.setEmail(request.getEmail());
        admin.setPassword(encoder.encode(request.getPassword()));
        admin.setFullName(request.getFullName());
        admin.setDepartment(request.getDepartment());
        
        Role role = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        admin.setRole(role);
        adminRepository.save(admin);
    }
    
    @Transactional
    public void upgradeCustomerToSeller(String email, String shopName) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user instanceof Customer) {
            // This is a basic demonstration.
            // In a real scenario, changing entity types in Joined inheritance is tricky via JPA.
            // A common approach is using native SQL or transferring properties to a new entity.
            // Here, we'll keep it simple for illustration.
            throw new RuntimeException("Not implemented yet due to JPA inheritance constraints. Please implement a safe migration logic.");
        }
    }
}
