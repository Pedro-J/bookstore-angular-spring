package com.bookstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user_order")
public class Order implements Serializable{
	
	private static final long serialVersionUID = 145522845L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Date orderDate;
	private Date shippingDate;
	private String shippingMethod;
	private String orderStatus;
	private BigDecimal orderTotal;
	
	@OneToMany(mappedBy = "order", cascade=CascadeType.ALL)
	private List<ShoppingCartItem> cartItemList;
	
	@OneToOne(cascade = CascadeType.ALL)
	private OrderShipping orderShipping;
	
	@OneToOne(cascade = CascadeType.ALL)
	private OrderBilling orderBilling;
	
	@OneToOne(cascade = CascadeType.ALL)
	private OrderPayment orderPayment;
	
	@ManyToOne
	@JsonIgnore
	private User user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getShippingDate() {
		return shippingDate;
	}

	public void setShippingDate(Date shippingDate) {
		this.shippingDate = shippingDate;
	}

	public String getShippingMethod() {
		return shippingMethod;
	}

	public void setShippingMethod(String shippingMethod) {
		this.shippingMethod = shippingMethod;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public BigDecimal getOrderTotal() {
		return orderTotal;
	}

	public void setOrderTotal(BigDecimal orderTotal) {
		this.orderTotal = orderTotal;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public List<ShoppingCartItem> getCartItemList() {
		return cartItemList;
	}

	public void setCartItemList(List<ShoppingCartItem> cartItemList) {
		this.cartItemList = cartItemList;
	}

	public OrderShipping getOrderShipping() {
		return orderShipping;
	}

	public void setOrderShipping(OrderShipping orderShipping) {
		this.orderShipping = orderShipping;
	}

	public OrderBilling getOrderBilling() {
		return orderBilling;
	}

	public void setOrderBilling(OrderBilling orderBilling) {
		this.orderBilling = orderBilling;
	}

	public OrderPayment getOrderPayment() {
		return orderPayment;
	}

	public void setOrderPayment(OrderPayment orderPayment) {
		this.orderPayment = orderPayment;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
