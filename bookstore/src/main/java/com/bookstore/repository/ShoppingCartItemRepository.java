package com.bookstore.repository;

import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.ShoppingCartItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShoppingCartItemRepository extends CrudRepository<ShoppingCartItem, Long> {
	List<ShoppingCartItem> findByShoppingCart(ShoppingCart shoppingCart);
	
//	List<CartItem> findByOrder(Order order);
}
