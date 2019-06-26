package com.bookstore.rest.resource;

import com.bookstore.domain.OrderEntity;
import com.bookstore.domain.UserEntity;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(OrderResource.BASE_URL)
public class OrderResource {

    public static final String BASE_URL = "/bookstore/api/v1/orders";

	private UserService userService;

	@Autowired
	public OrderResource(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/list")
	@ResponseStatus(HttpStatus.OK)
	public List<OrderEntity> getOrderList(Principal principal) {
		UserEntity user = userService.findByUsername(principal.getName());
		List<OrderEntity> orderList = user.getOrderList();
		
		return orderList;
	}
}
