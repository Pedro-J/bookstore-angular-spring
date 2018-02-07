package com.bookstore.service;

import com.bookstore.domain.User;
import com.bookstore.domain.UserShipping;

public interface UserShippingService {
	
	UserShipping findById(Long id);
	
	void removeById(Long id);
	UserShipping save(UserShipping shipping);
	UserShipping save(UserShipping userShipping, User user);
	void setUserDefaultShipping(Long userShippingId, User user);

}
