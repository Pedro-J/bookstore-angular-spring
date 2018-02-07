package com.bookstore.service;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;

public interface UserPaymentService {
	UserPayment findById(Long id);
	void removeById(Long id);
	void setDefaultPayment(Long userPaymentId, User user);
    UserPayment save(UserPayment userPayment, User user);
	void updatePaymentInfo(UserBilling userBilling, UserPayment userPayment, User user);
}
