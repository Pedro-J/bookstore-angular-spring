package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.domain.UserPayment;
import com.bookstore.service.UserPaymentService;
import com.bookstore.service.UserService;
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


    public PaymentResource(UserService userService, UserPaymentService userPaymentService) {
        this.userService = userService;
        this.userPaymentService = userPaymentService;
    }

    @PostMapping("/add")
	public UserPayment addNewPayment(@RequestBody UserPayment userPayment, Principal principal) {
		User user = userService.findByUsername(principal.getName());
		
		return userPaymentService.save(userPayment, user);
	}
	
	@RequestMapping("/list")
	public List<UserPayment> getPaymentList(Principal principal){
		User user = userService.findByUsername(principal.getName());
		
		List<UserPayment> userPaymentList = user.getUserPaymentList();
		
		return userPaymentList;
	}

	@DeleteMapping("/{id}")
	public void removePayment(@PathVariable("id") Long id) {
		userPaymentService.removeById(id);
	}

	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public void updatePayment(@RequestBody UserPayment payment, Principal principal){
        User user = userService.findByUsername(principal.getName());
        payment.setUser(user);

		userPaymentService.save(payment, user);
	}

	@PostMapping("/setDefault")
	@ResponseStatus(HttpStatus.OK)
	public void setDefaultPaymentPost(@RequestBody String id, Principal principal) {
		User user = userService.findByUsername(principal.getName());
		userPaymentService.setDefaultPayment(Long.parseLong(id), user);
	}
	
}
