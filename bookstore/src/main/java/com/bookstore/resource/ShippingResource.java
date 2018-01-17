package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.domain.UserShipping;
import com.bookstore.service.UserService;
import com.bookstore.service.UserShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/shipping")
public class ShippingResource {

	private UserService userService;

	private UserShippingService userShippingService;

	@Autowired
	public ShippingResource(UserService userService, UserShippingService userShippingService) {
		this.userService = userService;
		this.userShippingService = userShippingService;
	}

	@PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
	public UserShipping addNewUserShippingPost(@RequestBody UserShipping userShipping, Principal principal) {
		User user = userService.findByUsername(principal.getName());
		return userShippingService.updateUserShipping(userShipping, user);
	}
	
	@GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
	public List<UserShipping> getUserShippingList(Principal principal){
		User user = userService.findByUsername(principal.getName());
		return user.getUserShippingList();
	}
	
	@DeleteMapping("{id}/remove")
    @ResponseStatus(HttpStatus.OK)
	public void removeUserShippingPost(@PathVariable Long id) {
		userShippingService.removeById(id);
	}
	
	@PostMapping("/setDefault")
    @ResponseStatus(HttpStatus.OK)
	public void setDefaultUserShippingPost(@RequestBody String id, Principal principal){
		User user = userService.findByUsername(principal.getName());
		userShippingService.setUserDefaultShipping(Long.parseLong(id), user);
	}
}
