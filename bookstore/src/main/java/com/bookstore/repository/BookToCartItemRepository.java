package com.bookstore.repository;

import com.bookstore.domain.BookToCartItem;
import com.bookstore.domain.ShoppingCartItem;
import org.springframework.data.repository.CrudRepository;

public interface BookToCartItemRepository extends CrudRepository<BookToCartItem, Long>{
	void deleteByCartItem(ShoppingCartItem cartItem);
}
