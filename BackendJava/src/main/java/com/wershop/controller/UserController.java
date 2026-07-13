package com.wershop.controller;

import com.wershop.dto.response.ApiResponse;
import com.wershop.dto.response.UserResponse;
import com.wershop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserResponse profile = userService.getUserProfile(email);
        return ResponseEntity.ok(ApiResponse.success(profile));
    }
}
