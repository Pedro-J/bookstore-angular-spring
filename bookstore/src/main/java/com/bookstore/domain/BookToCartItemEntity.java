package com.bookstore.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_book_cart_item")
public class BookToCartItem implements Serializable{
	private static final long serialVersionUID = 879172834L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="book_id")
	private Book book;
	
	@ManyToOne
	@JoinColumn(name="cart_item_id")
	private ShoppingCartItem cartItem;

	public BookToCartItem(Book book, ShoppingCartItem cartItem) {
		this.book = book;
		this.cartItem = cartItem;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public ShoppingCartItem getCartItem() {
		return cartItem;
	}

	public void setCartItem(ShoppingCartItem cartItem) {
		this.cartItem = cartItem;
	}

}
