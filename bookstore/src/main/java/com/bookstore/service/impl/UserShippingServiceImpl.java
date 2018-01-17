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
@Transactional( readOnly = true )
public class UserShippingServiceImpl implements UserShippingService{

	private UserRepository userRepository;

	private UserShippingRepository userShippingRepository;

	@Autowired
	public UserShippingServiceImpl(UserRepository userRepository, UserShippingRepository userShippingRepository) {
		this.userRepository = userRepository;
		this.userShippingRepository = userShippingRepository;
	}

	public UserShipping findById(Long id) {
		return userShippingRepository.findOne(id);
	}

	@Transactional
	public void removeById(Long id) {
		userShippingRepository.delete(id);
	}

	@Transactional
	public UserShipping updateUserShipping(UserShipping userShipping, User user) {
		userShipping.setUser(user);
		userShipping.setUserShippingDefault(true);
		user.getUserShippingList().add(userShipping);
		userRepository.save(user);

		return userShipping;
	}

	@Transactional
	public void setUserDefaultShipping(Long userShippingId, User user) {
		List<UserShipping> userShippingList = (List<UserShipping>) userShippingRepository.findAll();

		for (UserShipping userShipping : userShippingList) {
			if( userShipping.getId().equals(userShippingId) ) {
				userShipping.setUserShippingDefault(true);
				userShippingRepository.save(userShipping);
			} else {
				userShipping.setUserShippingDefault(false);
				userShippingRepository.save(userShipping);
			}
		}
	}
}
