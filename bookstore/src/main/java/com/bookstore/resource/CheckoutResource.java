package com.bookstore.resource;


import com.bookstore.domain.*;
import com.bookstore.service.OrderService;
import com.bookstore.service.ShoppingCartItemService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;
import com.bookstore.utility.MailBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Locale;

@RestController
@RequestMapping("/checkout")
public class CheckoutResource {

	private UserService userService;

	private ShoppingCartItemService cartItemService;

	private OrderService orderService;

	private ShoppingCartService shoppingCartService;

	private MailBuilder mailBuilder;

	@Autowired
    public CheckoutResource(UserService userService, ShoppingCartItemService cartItemService, OrderService orderService, ShoppingCartService shoppingCartService, MailBuilder mailBuilder) {
        this.userService = userService;
        this.cartItemService = cartItemService;
        this.orderService = orderService;
        this.shoppingCartService = shoppingCartService;
        this.mailBuilder = mailBuilder;
    }

    @PostMapping("/add")
	@ResponseStatus(HttpStatus.OK)
	public Order checkoutPost(
				@RequestBody HashMap<String, Object> mapper,
				Principal principal ){
		ObjectMapper om = new ObjectMapper();

        OrderShipping shipping = om.convertValue(mapper.get("orderShipping"), OrderShipping.class);
        OrderBilling billing = om.convertValue(mapper.get("orderBilling"), OrderBilling.class);
        OrderPayment payment = om.convertValue(mapper.get("orderPayment"), OrderPayment.class);
		String shippingMethod = (String) mapper.get("shippingMethod");
		
		ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
		User user = userService.findByUsername(principal.getName());

		Order order = orderService.createOrder(shoppingCart, shipping, billing, payment, shippingMethod, user);

		mailBuilder.sendOrderConfirmationMail(user, order, Locale.ENGLISH);

		shoppingCartService.clearShoppingCart(shoppingCart);
		
		LocalDate today = LocalDate.now();
		LocalDate estimatedDeliveryDate;

		if (shippingMethod.equals("groundShipping")) {
			estimatedDeliveryDate = today.plusDays(5);
		} else {
			estimatedDeliveryDate = today.plusDays(3);
		}
		
		return order;
	}

}
