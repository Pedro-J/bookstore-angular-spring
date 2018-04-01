package com.bookstore.service;

import com.bookstore.domain.*;

public interface OrderService {

     Order createOrder(
        ShoppingCart shoppingCart,
        OrderShipping orderShipping,
        OrderBilling orderBilling,
        OrderPayment orderPayment,
        String shippingMethod,
        User user);

}
