package com.bookstore.rest.resource;

import com.bookstore.domain.BookEntity;
import com.bookstore.domain.ShoppingCartEntity;
import com.bookstore.domain.ShoppingCartItemEntity;
import com.bookstore.domain.UserEntity;
import com.bookstore.service.BookService;
import com.bookstore.service.ShoppingCartItemService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(ShoppingCartResource.BASE_URL)
public class ShoppingCartResource {

	public static final String BASE_URL = "/bookstore/api/v1/cart";

	private UserService userService;
	
	private BookService bookService;

	private ShoppingCartItemService cartItemService;

	private ShoppingCartService shoppingCartService;

    @Autowired
	public ShoppingCartResource(UserService userService, BookService bookService,
                                ShoppingCartItemService cartItemService, ShoppingCartService shoppingCartService) {
        this.userService = userService;
        this.bookService = bookService;
        this.cartItemService = cartItemService;
        this.shoppingCartService = shoppingCartService;
    }

    @PostMapping("/add")
	@ResponseStatus(HttpStatus.OK)
	public void addItem(@RequestBody HashMap<String, String> mapper, Principal principal) {
		String bookId = (String) mapper.get("bookId");
		String qty = (String) mapper.get("qty");
		
		UserEntity user = userService.findByUsername(principal.getName());
		BookEntity book = bookService.findById(Long.parseLong(bookId));
		
		cartItemService.addBookToCartItem(book, user, Integer.parseInt(qty));
	}


	@GetMapping("/items")
    @ResponseStatus(HttpStatus.OK)
	public List<ShoppingCartItemEntity> getCartItemList(Principal principal) {
		UserEntity user = userService.findByUsername(principal.getName());
		ShoppingCartEntity shoppingCart = user.getShoppingCart();
		
		List<ShoppingCartItemEntity> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		
		shoppingCartService.updateShoppingCart(shoppingCart);
		
		return cartItemList;
	}
	
	@GetMapping
    @ResponseStatus(HttpStatus.OK)
	public ShoppingCartEntity getShoppingCart(Principal principal) {
		UserEntity user = userService.findByUsername(principal.getName());
		ShoppingCartEntity shoppingCart = user.getShoppingCart();
		
		return shoppingCartService.updateShoppingCart(shoppingCart);
	}
	
	@DeleteMapping("/items/{id}")
    @ResponseStatus(HttpStatus.OK)
	public void removeItem(@PathVariable("id") String id) {
		cartItemService.removeCartItem(cartItemService.findById(Long.parseLong(id)));
	}
	
	@PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
	public void updateCartItem(@RequestBody HashMap<String, String> mapper){
		String cartItemId = mapper.get("cartItemId");
		String qty = mapper.get("qty");
		
		ShoppingCartItemEntity cartItem = cartItemService.findById(Long.parseLong(cartItemId));
		cartItem.setQuantity(Integer.parseInt(qty));
		
		cartItemService.updateCartItem(cartItem);
	}
	
}
