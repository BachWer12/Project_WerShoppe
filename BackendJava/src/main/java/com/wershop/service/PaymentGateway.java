package com.wershop.service;

public interface PaymentGateway {
    String generatePaymentUrl(Long orderId, java.math.BigDecimal amount, String callbackUrl);
    boolean verifyWebhookSignature(String payload, String signature);
}
