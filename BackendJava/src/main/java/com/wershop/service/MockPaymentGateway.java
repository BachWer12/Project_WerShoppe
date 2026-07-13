package com.wershop.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class MockPaymentGateway implements PaymentGateway {
    @Override
    public String generatePaymentUrl(Long orderId, BigDecimal amount, String callbackUrl) {
        // In a real scenario, this would call VNPay, Stripe, MoMo API.
        // For mock, we return a URL to a local mock payment page.
        return "http://localhost:5173/mock-payment?orderId=" + orderId + "&amount=" + amount + "&callback=" + callbackUrl;
    }

    @Override
    public boolean verifyWebhookSignature(String payload, String signature) {
        // Mock validation: normally verify HMAC or RSA signature
        return "MOCK_VALID_SIG".equals(signature);
    }
}
