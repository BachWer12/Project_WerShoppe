package com.wershop.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class JwtResponse {
    private String accessToken;
    @Builder.Default
    private String type = "Bearer";
    private String refreshToken;
    private Long id;
    private String email;
    private String role;
}