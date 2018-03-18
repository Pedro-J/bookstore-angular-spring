package com.bookstore.service;

import com.bookstore.domain.*;

public interface OrderService {
	
	Order createOrder(
            ShoppingCart shoppingCart,
            OrderShipping orderShipping,
            OrderBilling orderBilling,
            UserPayment payment,
            String shippingMethod,
            User user
    );

}
