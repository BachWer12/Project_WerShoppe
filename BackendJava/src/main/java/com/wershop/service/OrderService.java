package com.wershop.service;

import com.wershop.entity.*;
import com.wershop.exception.BusinessException;
import com.wershop.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<Order> checkout(Long buyerId, String shippingAddress, String paymentMethod) {
        Cart cart = cartRepository.findByBuyerId(buyerId)
                .orElseThrow(() -> new BusinessException("Cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new BusinessException("Cart is empty");
        }

        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new BusinessException("Buyer not found"));

        // Group items by Shop to split orders
        Map<Shop, List<CartItem>> itemsByShop = cart.getItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getShop()));

        List<Order> createdOrders = new ArrayList<>();

        for (Map.Entry<Shop, List<CartItem>> entry : itemsByShop.entrySet()) {
            Shop shop = entry.getKey();
            List<CartItem> shopItems = entry.getValue();

            BigDecimal totalAmount = BigDecimal.ZERO;
            List<OrderItem> orderItems = new ArrayList<>();

            Order order = Order.builder()
                    .buyer(buyer)
                    .shop(shop)
                    .shippingAddress(shippingAddress)
                    .paymentMethod(paymentMethod)
                    .status("PENDING_PAYMENT")
                    .build();

            for (CartItem cartItem : shopItems) {
                Product product = cartItem.getProduct();
                
                // Re-verify stock and status
                if (!"ACTIVE".equals(product.getStatus())) {
                    throw new BusinessException("Product " + product.getName() + " is no longer active");
                }
                if (product.getStock() < cartItem.getQuantity()) {
                    throw new BusinessException("Not enough stock for " + product.getName());
                }

                // Deduct stock (Hold)
                product.setStock(product.getStock() - cartItem.getQuantity());
                productRepository.save(product);

                BigDecimal itemPrice = product.getSalePrice() != null ? product.getSalePrice() : product.getPrice();
                totalAmount = totalAmount.add(itemPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity())));

                OrderItem orderItem = OrderItem.builder()
                        .order(order)
                        .product(product)
                        .quantity(cartItem.getQuantity())
                        .price(itemPrice)
                        .build();
                        
                orderItems.add(orderItem);
            }

            order.setTotalAmount(totalAmount);
            order.setItems(orderItems);
            
            createdOrders.add(orderRepository.save(order));
        }

        // Clear cart
        cart.getItems().clear();
        cartRepository.save(cart);

        return createdOrders;
    }
}
