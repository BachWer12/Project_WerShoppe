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
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    RefreshTokenService refreshTokenService;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
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
        Role role = roleRepository.findByName(RoleName.ROLE_CUSTOMER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        customer.setRole(role);
        customerRepository.save(customer);
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
        sellerRepository.save(seller);
    }
}