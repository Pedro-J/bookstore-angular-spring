package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.service.UserBillingService;
import com.bookstore.service.UserPaymentService;
import com.bookstore.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentResource {

	private UserService userService;

	private UserPaymentService userPaymentService;

	private UserBillingService userBillingService;

    public PaymentResource(UserService userService, UserPaymentService userPaymentService, UserBillingService userBillingService) {
        this.userService = userService;
        this.userPaymentService = userPaymentService;
        this.userBillingService = userBillingService;
    }

    @PostMapping("/add")
	public void addNewPayment(@RequestBody UserPayment userPayment, Principal principal) {
		User user = userService.findByUsername(principal.getName());
		
		UserBilling userBilling = userPayment.getUserBilling();
		
		userBillingService.updateUserBilling(userBilling, userPayment, user);
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

	@PostMapping("/setDefault")
	@ResponseStatus(HttpStatus.OK)
	public void setDefaultPaymentPost(@RequestBody String id, Principal principal) {
		User user = userService.findByUsername(principal.getName());
		userPaymentService.setUserDefaultPayment(Long.parseLong(id), user);
	}
	
}
