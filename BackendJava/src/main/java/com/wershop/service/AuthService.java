package com.wershop.service;

import com.wershop.dto.request.LoginRequest;
import com.wershop.dto.request.SignupCustomerRequest;
import com.wershop.dto.request.SignupSellerRequest;
import com.wershop.dto.response.JwtResponse;
import com.wershop.entity.Customer;
import com.wershop.entity.RefreshToken;
import com.wershop.entity.Role;
import com.wershop.entity.RoleName;
import com.wershop.entity.Seller;
import com.wershop.entity.User;
import com.wershop.exception.BusinessException;
import com.wershop.exception.ConflictException;
import com.wershop.repository.CustomerRepository;
import com.wershop.repository.RoleRepository;
import com.wershop.repository.SellerRepository;
import com.wershop.repository.UserRepository;
import com.wershop.security.JwtUtils;
import com.wershop.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    SellerRepository sellerRepository;
    @Autowired
    com.wershop.repository.ShopRepository shopRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    RefreshTokenService refreshTokenService;
    @Autowired
    OtpService otpService;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new BusinessException("User not found"));
            
        if (!user.isEnabled() || !"ACTIVE".equals(user.getStatus())) {
            throw new BusinessException("Account is not active. Please verify OTP.");
        }
        
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return JwtResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken.getToken())
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .role(role)
                .build();
    }

    @Transactional
    public void registerCustomer(SignupCustomerRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new ConflictException("Error: Email is already in use!");
        }
        Customer customer = new Customer();
        customer.setEmail(signUpRequest.getEmail());
        customer.setPassword(encoder.encode(signUpRequest.getPassword()));
        customer.setFullName(signUpRequest.getFullName());
        Role role = roleRepository.findByName(RoleName.ROLE_BUYER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        customer.setRole(role);
        customer.setEnabled(false);
        customer.setStatus("PENDING_VERIFICATION");
        customerRepository.save(customer);
        
        otpService.generateAndSendOtp(customer.getEmail());
    }

    @Transactional
    public void registerSeller(SignupSellerRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new ConflictException("Error: Email is already in use!");
        }
        Seller seller = new Seller();
        seller.setEmail(signUpRequest.getEmail());
        seller.setPassword(encoder.encode(signUpRequest.getPassword()));
        seller.setFullName(signUpRequest.getFullName());
        seller.setShopName(signUpRequest.getShopName());
        Role role = roleRepository.findByName(RoleName.ROLE_SELLER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        seller.setRole(role);
        seller.setEnabled(false);
        seller.setStatus("PENDING_VERIFICATION");
        sellerRepository.save(seller);
        
        com.wershop.entity.Shop shop = com.wershop.entity.Shop.builder()
                .seller(seller)
                .name(signUpRequest.getShopName())
                .status("PENDING")
                .build();
        shopRepository.save(shop);
        
        otpService.generateAndSendOtp(seller.getEmail());
    }
    
    @Transactional
    public void verifyOtp(String email, String otp) {
        if (!otpService.verifyOtp(email, otp)) {
            throw new BusinessException("Invalid or expired OTP");
        }
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException("User not found"));
        user.setEnabled(true);
        user.setEmailVerified(true);
        user.setStatus("ACTIVE");
        userRepository.save(user);
    }

    @Transactional
    public void upgradeToSeller(Long userId, String shopName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("User not found"));

        if (!"ROLE_BUYER".equals(user.getRole().getName().name())) {
            throw new BusinessException("Only buyers can upgrade to seller");
        }

        if (shopRepository.findByName(shopName).isPresent()) {
            throw new ConflictException("Shop name already exists!");
        }

        Role roleSeller = roleRepository.findByName(RoleName.ROLE_SELLER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        userRepository.upgradeToSellerNative(userId, shopName, roleSeller.getId());

        // Because we upgraded using native query, JPA might still cache the old User instance.
        // The newly inserted Shop relies on the Seller. 
        // We can just create the Shop using native query or flush and fetch.
        Seller upgradedSeller = sellerRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("Failed to upgrade seller"));

        com.wershop.entity.Shop shop = com.wershop.entity.Shop.builder()
                .seller(upgradedSeller)
                .name(shopName)
                .status("APPROVED") // Automatically approve for this task or PENDING depending on rules. We'll set APPROVED so they can use it immediately.
                .build();
        shopRepository.save(shop);
    }
}