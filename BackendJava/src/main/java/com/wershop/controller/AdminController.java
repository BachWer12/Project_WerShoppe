package com.wershop.controller;

import com.wershop.dto.request.AdminCreationRequest;
import com.wershop.dto.response.ApiResponse;
import com.wershop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Void>> createAdmin(@Valid @RequestBody AdminCreationRequest request) {
        userService.createAdmin(request);
        return ResponseEntity.ok(ApiResponse.success("Admin created successfully!", null));
    }
}
