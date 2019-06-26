package com.bookstore.rest.resource;


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
	public OrderEntity checkoutPost(
				@RequestBody HashMap<String, Object> mapper,
				Principal principal ){
		ObjectMapper om = new ObjectMapper();

        OrderShippingEntity shipping = om.convertValue(mapper.get("orderShipping"), OrderShippingEntity.class);
        OrderBillingEntity billing = om.convertValue(mapper.get("orderBilling"), OrderBillingEntity.class);
        OrderPaymentEntity payment = om.convertValue(mapper.get("orderPayment"), OrderPaymentEntity.class);
		String shippingMethod = (String) mapper.get("shippingMethod");
		
		ShoppingCartEntity shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
		UserEntity user = userService.findByUsername(principal.getName());

		OrderEntity order = orderService.createOrder(shoppingCart, shipping, billing, payment, shippingMethod, user);

		mailBuilder.sendOrderConfirmationMail(user, order, Locale.ENGLISH);

		shoppingCartService.clearShoppingCart(shoppingCart);


		
		return order;
	}

}
