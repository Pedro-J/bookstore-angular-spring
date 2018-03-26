package com.bookstore.service.impl;

import com.bookstore.domain.*;
import com.bookstore.repository.OrderBillingRepository;
import com.bookstore.repository.OrderPaymentRepository;
import com.bookstore.repository.OrderRepository;
import com.bookstore.repository.OrderShippingRepository;
import com.bookstore.service.BookService;
import com.bookstore.service.OrderService;
import com.bookstore.service.ShoppingCartItemService;
import com.bookstore.utility.MailBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderBillingRepository billingAddressRepository;
	
	@Autowired
	private OrderShippingRepository shippingAddressRepository;
	
	@Autowired
	private OrderPaymentRepository paymentRepository;
	
	@Autowired
	private ShoppingCartItemService cartItemService;
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private MailBuilder mailConstructor;
	
	public synchronized  Order createOrder(
			ShoppingCart shoppingCart,
			OrderShipping shippingAddress,
			OrderBilling billingAddress,
			UserPayment payment,
			String shippingMethod,
			User user
			){
		Order order = new Order();
		order.setBillingAddress(billingAddress);
		order.setOrderStatus("created");
		order.setPayment(payment);
		order.setShippingAddress(shippingAddress);
		order.setShippingMethod(shippingMethod);
		
		List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		
		for (CartItem cartItem : cartItemList) {
			Book book = cartItem.getBook();
			cartItem.setOrder(order);
			book.setInStockNumber(book.getInStockNumber()-cartItem.getQty());
		}
		
		order.setCartItemList(cartItemList);
		order.setOrderDate(Calendar.getInstance().getTime());
		order.setOrderTotal(shoppingCart.getGrandTotal());
		shippingAddress.setOrder(order);
		billingAddress.setOrder(order);
		payment.setOrder(order);
		order.setUser(user);
		order = orderRepository.save(order);
		
		return order;
	}
	
	public Order findOne(Long id) {
		return orderRepository.findOne(id);
	}

}
