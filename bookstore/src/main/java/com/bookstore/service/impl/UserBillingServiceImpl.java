package com.bookstore.service.impl;

import com.bookstore.repository.UserPaymentRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.UserBillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserBillingServiceImpl implements UserBillingService {

    private UserPaymentRepository userPaymentRepository;

    private UserRepository userRepository;

    @Autowired
    public UserBillingServiceImpl(UserPaymentRepository userPaymentRepository, UserRepository userRepository) {
        this.userPaymentRepository = userPaymentRepository;
        this.userRepository = userRepository;
    }

}
