package com.bookstore.resource;


import com.bookstore.domain.*;
import com.bookstore.service.OrderService;
import com.bookstore.service.ShoppingCartItemService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;
import com.bookstore.utility.MailBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/checkout")
public class CheckoutResource {

	private Order order = new Order();

	private JavaMailSender mailSender;

	private UserService userService;

	private ShoppingCartItemService cartItemService;

	private OrderService orderService;

	private ShoppingCartService shoppingCartService;

	private MailBuilder mailBuilder;

	public CheckoutResource() {

    }
	
	@RequestMapping(value = "/checkout", method=RequestMethod.POST)
	public Order checkoutPost(
				@RequestBody HashMap<String, Object> mapper,
				Principal principal
			){
		ObjectMapper om = new ObjectMapper();

        OrderShipping shipping = om.convertValue(mapper.get("shippingAddress"), OrderShipping.class);
        OrderBilling billing = om.convertValue(mapper.get("billingAddress"), OrderBilling.class);
        OrderPayment payment = om.convertValue(mapper.get("payment"), OrderPayment.class);
		String shippingMethod = (String) mapper.get("shippingMethod");
		
		ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
		List<ShoppingCartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		User user = userService.findByUsername(principal.getName());

		Order order = orderService.createOrder(shoppingCart, shipping, billing, payment, shippingMethod, user);
		
		mailBuilder.constructOrderConfirmationEmail(user, order, Locale.ENGLISH);
		mailBuilder.sendOrderConfirmationMail();

		
		shoppingCartService.clearShoppingCart(shoppingCart);
		
		LocalDate today = LocalDate.now();
		LocalDate estimatedDeliveryDate;
		if (shippingMethod.equals("groundShipping")) {
			estimatedDeliveryDate=today.plusDays(5);
		} else {
			estimatedDeliveryDate=today.plusDays(3);
		}
		
		this.order = order;
		
		return order;
		
	}

}
