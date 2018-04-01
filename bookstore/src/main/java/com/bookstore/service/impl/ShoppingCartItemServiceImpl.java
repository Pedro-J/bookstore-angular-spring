package com.bookstore.service.impl;

import com.bookstore.domain.*;
import com.bookstore.repository.BookToCartItemRepository;
import com.bookstore.repository.ShoppingCartItemRepository;
import com.bookstore.service.ShoppingCartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ShoppingCartItemServiceImpl implements ShoppingCartItemService{
	

	private ShoppingCartItemRepository cartItemRepository;

	private BookToCartItemRepository bookToShoppingCartItemRepository;

	@Autowired
	public ShoppingCartItemServiceImpl(ShoppingCartItemRepository cartItemRepository, BookToCartItemRepository bookToShoppingCartItemRepository) {
		this.cartItemRepository = cartItemRepository;
		this.bookToShoppingCartItemRepository = bookToShoppingCartItemRepository;
	}

	public ShoppingCartItem addBookToCartItem(Book book, User user, int qty) {
		List<ShoppingCartItem> cartItemList = findByShoppingCart(user.getShoppingCart());
		
		for (ShoppingCartItem cartItem : cartItemList) {
			if ( book.getId().equals(cartItem.getBook().getId()) ) {
				cartItem.setQty(cartItem.getQty() + qty);
				cartItem.setSubtotal(new BigDecimal(book.getOurPrice()).multiply(new BigDecimal(qty)));
				cartItemRepository.save(cartItem);
				return cartItem;
			}
		}
		
		ShoppingCartItem cartItem = new ShoppingCartItem();
		cartItem.setShoppingCart(user.getShoppingCart());
		cartItem.setBook(book);
		cartItem.setQty(qty);
		cartItem.setSubtotal(new BigDecimal(book.getOurPrice()).multiply(new BigDecimal(qty)));
		
		cartItem = cartItemRepository.save(cartItem);
		
		BookToCartItem bookToCartItem = new BookToCartItem();
		bookToCartItem.setBook(book);
		bookToCartItem.setCartItem(cartItem);
		bookToShoppingCartItemRepository.save(bookToCartItem);
		
		return cartItem;
	}
	
	@Transactional
	public void removeCartItem(ShoppingCartItem cartItem) {
		bookToShoppingCartItemRepository.deleteByCartItem(cartItem);
		cartItemRepository.delete(cartItem);
	}
	
	public List<ShoppingCartItem> findByShoppingCart(ShoppingCart shoppingCart) {
		return cartItemRepository.findByShoppingCart(shoppingCart);
	}
	
	public ShoppingCartItem updateCartItem(ShoppingCartItem cartItem) {
		BigDecimal bigDecimal = new BigDecimal(cartItem.getBook().getOurPrice()).multiply(new BigDecimal(cartItem.getQty()));
		bigDecimal = bigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP);
		cartItem.setSubtotal(bigDecimal);
		
		cartItemRepository.save(cartItem);
		
		return cartItem;
		
	}
	
	public ShoppingCartItem findById(Long id) {
		return cartItemRepository.findOne(id);
	}
	
	public ShoppingCartItem save(ShoppingCartItem cartItem) {
		return cartItemRepository.save(cartItem);
	}
	
//	public List<ShoppingCartItem> findByOrder(Order order) {
//		return cartItemRepository.findByOrder(order);
//	}
}
