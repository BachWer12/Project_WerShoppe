package com.wershop.service;

import com.wershop.entity.Cart;
import com.wershop.entity.CartItem;
import com.wershop.entity.Product;
import com.wershop.entity.User;
import com.wershop.exception.BusinessException;
import com.wershop.repository.CartItemRepository;
import com.wershop.repository.CartRepository;
import com.wershop.repository.ProductRepository;
import com.wershop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Cart addToCart(Long buyerId, Long productId, Integer quantity) {
        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new BusinessException("Buyer not found"));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException("Product not found"));
                
        if (!"ACTIVE".equals(product.getStatus())) {
            throw new BusinessException("Product is not available");
        }
        
        if (product.getStock() < quantity) {
            throw new BusinessException("Not enough stock");
        }

        Cart cart = cartRepository.findByBuyerId(buyerId)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder().buyer(buyer).build();
                    return cartRepository.save(newCart);
                });

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .build();
            cartItemRepository.save(newItem);
            cart.getItems().add(newItem);
        }

        return cart;
    }
    
    public Cart getCart(Long buyerId) {
        return cartRepository.findByBuyerId(buyerId)
            .orElseThrow(() -> new BusinessException("Cart is empty"));
    }
}
