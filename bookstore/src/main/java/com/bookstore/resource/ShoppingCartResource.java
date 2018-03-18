package com.bookstore.resource;

import com.bookstore.domain.*;
import com.bookstore.exception.BadRequestException;
import com.bookstore.service.BookService;
import com.bookstore.service.ShoppingCartItemService;
import com.bookstore.service.ShoppingCartService;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class ShoppingCartResource {

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
		
		User user = userService.findByUsername(principal.getName());
		Book book = bookService.findById(Long.parseLong(bookId));
		
		if(Integer.parseInt(qty) > book.getInStockNumber()) {
			throw new BadRequestException("stockNotEnough");
		}
		
		cartItemService.addBookToCartItem(book, user, Integer.parseInt(qty));
	}


	@GetMapping("/items")
    @ResponseStatus(HttpStatus.OK)
	public List<ShoppingCartItem> getCartItemList(Principal principal) {
		User user = userService.findByUsername(principal.getName());
		ShoppingCart shoppingCart = user.getShoppingCart();
		
		List<ShoppingCartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		
		shoppingCartService.updateShoppingCart(shoppingCart);
		
		return cartItemList;
	}
	
	@GetMapping("")
    @ResponseStatus(HttpStatus.OK)
	public ShoppingCart getShoppingCart(Principal principal) {
		User user = userService.findByUsername(principal.getName());
		ShoppingCart shoppingCart = user.getShoppingCart();
		
		shoppingCartService.updateShoppingCart(shoppingCart);
		
		return shoppingCart;
	}
	
	@DeleteMapping("/items/{id}")
    @ResponseStatus(HttpStatus.OK)
	public ResponseEntity removeItem(@PathVariable("id") String id) {
		cartItemService.removeCartItem(cartItemService.findById(Long.parseLong(id)));
		
		return new ResponseEntity("Cart Item Removed Successfully!", HttpStatus.OK);
	}
	
	@PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
	public void updateCartItem(@RequestBody HashMap<String, String> mapper){
		String cartItemId = mapper.get("cartItemId");
		String qty = mapper.get("qty");
		
		ShoppingCartItem cartItem = cartItemService.findById(Long.parseLong(cartItemId));
		cartItem.setQty(Integer.parseInt(qty));
		
		cartItemService.updateCartItem(cartItem);
	}
	
}
