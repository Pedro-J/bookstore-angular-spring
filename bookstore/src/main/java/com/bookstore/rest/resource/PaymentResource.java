package com.bookstore.rest.resource;

import com.bookstore.domain.UserEntity;
import com.bookstore.domain.UserPaymentEntity;
import com.bookstore.service.UserPaymentService;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(PaymentResource.BASE_URL)
public class PaymentResource {

    public static final String BASE_URL = "/bookstore/api/v1/payments";

	private UserService userService;

	private UserPaymentService userPaymentService;


	@Autowired
    public PaymentResource(UserService userService, UserPaymentService userPaymentService) {
        this.userService = userService;
        this.userPaymentService = userPaymentService;
    }

    @PostMapping("/add")
	public UserPaymentEntity addNewPayment(@RequestBody UserPaymentEntity userPayment, Principal principal) {
		UserEntity user = userService.findByUsername(principal.getName());
		
		return userPaymentService.save(userPayment, user);
	}
	
	@RequestMapping("/list")
	public List<UserPaymentEntity> getPaymentList(Principal principal){
		UserEntity user = userService.findByUsername(principal.getName());
		
		List<UserPaymentEntity> userPaymentList = user.getUserPaymentList();
		
		return userPaymentList;
	}

	@DeleteMapping("/{id}")
	public void removePayment(@PathVariable("id") Long id) {
		userPaymentService.removeById(id);
	}

	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public void updatePayment(@RequestBody UserPaymentEntity payment, Principal principal){
        UserEntity user = userService.findByUsername(principal.getName());
        payment.setUser(user);

		userPaymentService.save(payment, user);
	}

	@PostMapping("/setDefault")
	@ResponseStatus(HttpStatus.OK)
	public void setDefaultPaymentPost(@RequestBody String id, Principal principal) {
		UserEntity user = userService.findByUsername(principal.getName());
		userPaymentService.setDefaultPayment(Long.parseLong(id), user);
	}
	
}
