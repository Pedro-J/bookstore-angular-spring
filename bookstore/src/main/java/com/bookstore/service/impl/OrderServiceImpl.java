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
			OrderShipping orderShipping,
			OrderBilling orderBilling,
			OrderPayment orderPayment,
			String shippingMethod,
			User user ){

		final Order order = new Order();
		order.setOrderBilling(orderBilling);
		order.setOrderStatus("created");
		order.setOrderPayment(orderPayment);
		order.setOrderShipping(orderShipping);
		order.setShippingMethod(shippingMethod);
		
		List<ShoppingCartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

		cartItemList.forEach( item -> {
            Book book = item.getBook();
            item.setOrder(order);
            book.setInStockNumber(book.getInStockNumber() - item.getQty());
            bookService.save(book);
        });
		
		order.setCartItemList(cartItemList);
		order.setOrderDate(Calendar.getInstance().getTime());
		order.setOrderTotal(shoppingCart.getGrandTotal());
		orderShipping.setOrder(order);
		orderBilling.setOrder(order);
		orderPayment.setOrder(order);
		order.setUser(user);
		
		return orderRepository.save(order);
	}
	
	public Order findOne(Long id) {
		return orderRepository.findOne(id);
	}

}
