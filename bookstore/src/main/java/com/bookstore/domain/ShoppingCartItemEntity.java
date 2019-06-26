package com.bookstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "tb_cart_item")
public class ShoppingCartItem implements Serializable{

	private static final long serialVersionUID = -189412481L;
		
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private int qty;
	private BigDecimal subtotal;
	
	@OneToOne
	private BookEntity book;
	
	@OneToMany(mappedBy ="cartItem")
	@JsonIgnore
	private List<BookToCartItemEntity> bookToCartItemList;
	
	@ManyToOne
	@JoinColumn(name="shopping_cart_id")
	@JsonIgnore
	private ShoppingCart shoppingCart;

	@ManyToOne
	@JoinColumn(name = "order_id")
	@JsonIgnore
	private OrderEntity order;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public BigDecimal getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}

	public BookEntity getBook() {
		return book;
	}

	public void setBook(BookEntity book) {
		this.book = book;
	}

	public List<BookToCartItemEntity> getBookToCartItemList() {
		return bookToCartItemList;
	}

	public void setBookToCartItemList(List<BookToCartItemEntity> bookToCartItemList) {
		this.bookToCartItemList = bookToCartItemList;
	}

	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

}
