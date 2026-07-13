package com.wershop.controller;

import com.wershop.dto.request.LoginRequest;
import com.wershop.dto.request.SignupCustomerRequest;
import com.wershop.dto.request.SignupSellerRequest;
import com.wershop.dto.request.TokenRefreshRequest;
import com.wershop.dto.response.ApiResponse;
import com.wershop.dto.response.JwtResponse;
import com.wershop.dto.response.TokenRefreshResponse;
import com.wershop.entity.RefreshToken;
import com.wershop.exception.TokenRefreshException;
import com.wershop.security.JwtUtils;
import com.wershop.security.UserDetailsImpl;
import com.wershop.service.AuthService;
import com.wershop.service.RefreshTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    RefreshTokenService refreshTokenService;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("Login successfully", jwtResponse));
    }

    @PostMapping("/signup/customer")
    public ResponseEntity<ApiResponse<Void>> registerCustomer(@Valid @RequestBody SignupCustomerRequest signUpRequest) {
        authService.registerCustomer(signUpRequest);
        return ResponseEntity.ok(ApiResponse.success("Customer registered! OTP sent to email.", null));
    }

    @PostMapping("/signup/seller")
    public ResponseEntity<ApiResponse<Void>> registerSeller(@Valid @RequestBody SignupSellerRequest signUpRequest) {
        authService.registerSeller(signUpRequest);
        return ResponseEntity.ok(ApiResponse.success("Seller registered! OTP sent to email.", null));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Void>> verifyOtp(@Valid @RequestBody com.wershop.dto.request.VerifyOtpRequest request) {
        authService.verifyOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(ApiResponse.success("Account verified successfully!", null));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromEmail(user.getEmail());
                    return ResponseEntity.ok(ApiResponse.success(new TokenRefreshResponse(token, requestRefreshToken)));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logoutUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Log out successful!", null));
    }
}