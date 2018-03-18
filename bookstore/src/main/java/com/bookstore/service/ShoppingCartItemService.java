package com.bookstore.service;

import com.bookstore.domain.Book;
import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.ShoppingCartItem;
import com.bookstore.domain.User;

import java.util.List;

public interface ShoppingCartItemService {
	
	ShoppingCartItem addBookToCartItem(Book book, User user, int qty);
	
	List<ShoppingCartItem> findByShoppingCart(ShoppingCart shoppingCart);
	
//	List<CartItem> findByOrder(Order order);

	ShoppingCartItem updateCartItem(ShoppingCartItem cartItem);
	
	void removeCartItem(ShoppingCartItem cartItem);

	ShoppingCartItem findById(Long id);

	ShoppingCartItem save(ShoppingCartItem cartItem);

}
