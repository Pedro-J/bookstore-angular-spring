package com.bookstore.service.impl;

import com.bookstore.domain.User;
import com.bookstore.domain.UserShipping;
import com.bookstore.repository.UserRepository;
import com.bookstore.repository.UserShippingRepository;
import com.bookstore.service.UserShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserShippingServiceImpl implements UserShippingService{

	private UserRepository userRepository;

	private UserShippingRepository userShippingRepository;

	@Autowired
	public UserShippingServiceImpl(UserRepository userRepository, UserShippingRepository userShippingRepository) {
		this.userRepository = userRepository;
		this.userShippingRepository = userShippingRepository;
	}

    @Transactional( readOnly = true )
	public UserShipping findById(Long id) {
		return userShippingRepository.findOne(id);
	}


	public void removeById(Long id) {
		userShippingRepository.delete(id);
	}


	public UserShipping save(UserShipping userShipping, User user) {
		userShipping.setUser(user);
		userShipping.setDefault(false);

		List<UserShipping> shippingList = user.getUserShippingList();

		if( shippingList == null || shippingList.isEmpty() )
		    userShipping.setDefault(true);

		return userShippingRepository.save(userShipping);
	}

	public UserShipping save(UserShipping shipping) {
		return userShippingRepository.save(shipping);
	}

	public void setUserDefaultShipping(Long userShippingId, User user) {
		List<UserShipping> userShippingList = userShippingRepository.findByUser(user);

		for (UserShipping userShipping : userShippingList) {
			if( userShipping.getId().equals(userShippingId) ) {
				userShipping.setDefault(true);
			} else {
				userShipping.setDefault(false);

			}
			userShippingRepository.save(userShipping);
		}
	}
}
