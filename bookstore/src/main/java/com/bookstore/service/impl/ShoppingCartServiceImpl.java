package com.bookstore.service.impl;

import com.bookstore.domain.ShoppingCart;
import com.bookstore.domain.ShoppingCartItem;
import com.bookstore.repository.ShoppingCartRepository;
import com.bookstore.service.ShoppingCartItemService;
import com.bookstore.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class ShoppingCartServiceImpl implements ShoppingCartService{

	private ShoppingCartItemService cartItemService;

	private ShoppingCartRepository shoppingCartRepository;

	@Autowired
    public ShoppingCartServiceImpl(ShoppingCartItemService cartItemService, ShoppingCartRepository shoppingCartRepository) {
        this.cartItemService = cartItemService;
        this.shoppingCartRepository = shoppingCartRepository;
    }

    public ShoppingCart updateShoppingCart(ShoppingCart shoppingCart) {
		BigDecimal cartTotal = new BigDecimal(0);
		
		List<ShoppingCartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		
		for (ShoppingCartItem cartItem : cartItemList) {
			if (cartItem.getBook().getInStockNumber() > 0) {
				cartItemService.updateCartItem(cartItem);
				cartTotal = cartTotal.add(cartItem.getSubtotal());
			}
		}
		
		shoppingCart.setGrandTotal(cartTotal);
		
		shoppingCartRepository.save(shoppingCart);
		
		return shoppingCart;
	}
	
	public void clearShoppingCart(ShoppingCart shoppingCart) {
		List<ShoppingCartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		
		for(ShoppingCartItem cartItem : cartItemList) {
			cartItem.setShoppingCart(null);
			cartItemService.save(cartItem);
		}
		
		shoppingCart.setGrandTotal(new BigDecimal(0));
		
		shoppingCartRepository.save(shoppingCart);
	}

}
