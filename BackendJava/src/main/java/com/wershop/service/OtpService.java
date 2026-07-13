package com.wershop.service;

import com.wershop.entity.OtpVerification;
import com.wershop.repository.OtpVerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpVerificationRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Value("${otp.expiration-minutes:5}")
    private int otpExpirationMinutes;

    public void generateAndSendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        
        OtpVerification otpVerification = OtpVerification.builder()
                .email(email)
                .otp(otp)
                .expirationTime(LocalDateTime.now().plusMinutes(otpExpirationMinutes))
                .verified(false)
                .build();
                
        otpRepository.save(otpVerification);
        emailService.sendOtpEmail(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<OtpVerification> optionalOtp = otpRepository.findByEmailAndOtpAndVerifiedFalse(email, otp);
        if (optionalOtp.isPresent()) {
            OtpVerification verification = optionalOtp.get();
            if (verification.getExpirationTime().isAfter(LocalDateTime.now())) {
                verification.setVerified(true);
                otpRepository.save(verification);
                return true;
            }
        }
        return false;
    }
}
