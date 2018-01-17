package com.bookstore.service;

import com.bookstore.domain.User;

public interface UserService {
	User findById(Long id);
	User createUser(User user);
	User findByUsername(String username);
	User findByEmail(String email);
	void updateForgottenPassword(String email);
	void updateProfile(User modifiedUser, User currentUser);
	void update(User user);
}
