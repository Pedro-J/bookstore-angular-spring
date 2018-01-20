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
@RequestMapping(ShippingResource.BASE_URL)
public class ShippingResource {

    public static final String BASE_URL = "/bookstore/api/v1/shipping";

	private UserService userService;

	private UserShippingService userShippingService;

	@Autowired
	public ShippingResource(UserService userService, UserShippingService userShippingService) {
		this.userService = userService;
		this.userShippingService = userShippingService;
	}

	@PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
	public void addNewShipping(@RequestBody UserShipping userShipping, Principal principal) {
		User user = userService.findByUsername(principal.getName());
		userShippingService.updateUserShipping(userShipping, user);
	}
	
	@GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
	public List<UserShipping> getShippingList(Principal principal){
		User user = userService.findByUsername(principal.getName());
		return user.getUserShippingList();
	}
	
	@DeleteMapping("{id}/remove")
    @ResponseStatus(HttpStatus.OK)
	public void removeShipping(@PathVariable Long id) {
		userShippingService.removeById(id);
	}
	
	@PostMapping("/setDefault")
    @ResponseStatus(HttpStatus.OK)
	public void setDefaultShipping(@RequestBody String id, Principal principal){
		User user = userService.findByUsername(principal.getName());
		userShippingService.setUserDefaultShipping(Long.parseLong(id), user);
	}
}
