package com.bookstore.service.impl;

import com.bookstore.domain.User;
import com.bookstore.domain.UserBilling;
import com.bookstore.domain.UserPayment;
import com.bookstore.repository.UserBillingRepository;
import com.bookstore.repository.UserPaymentRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.UserPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional( readOnly = true )
public class UserPaymentServiceImpl implements UserPaymentService {

	private UserRepository userRepository;

	private UserBillingRepository userBillingRepository;

	private UserPaymentRepository userPaymentRepository;

	@Autowired
	public UserPaymentServiceImpl(UserRepository userRepository, UserPaymentRepository userPaymentRepository, UserBillingRepository userBillingRepository) {
		this.userRepository = userRepository;
		this.userPaymentRepository = userPaymentRepository;
		this.userBillingRepository = userBillingRepository;
	}

	public UserPayment findById(Long id) {
		return userPaymentRepository.findOne(id);
	}

	@Transactional
	public void removeById(Long id) {
		userPaymentRepository.delete(id);
	}

	@Transactional
	public void updatePaymentInfo(UserBilling userBilling, UserPayment userPayment, User user) {
		userRepository.save(user);
		userBillingRepository.save(userBilling);
		userPaymentRepository.save(userPayment);
	}

    @Transactional
    public void setDefaultPayment(Long userPaymentId, User user) {
        List<UserPayment> userPaymentList = userPaymentRepository.findByUser(user);

        for (UserPayment userPayment : userPaymentList) {
            if( userPayment.getId().equals(userPaymentId) ) {
                userPayment.setDefault(true);
            } else {
                userPayment.setDefault(false);
            }
			userPaymentRepository.save(userPayment);
        }
    }

    @Transactional
    public UserPayment save(UserPayment userPayment, User user) {
        userPayment.setUser(user);
        userPayment.getUserBilling().setUserPayment(userPayment);

        List<UserPayment> paymentList = user.getUserPaymentList();

        if( paymentList == null || paymentList.isEmpty() )
            userPayment.setDefault(true);
        else
            userPayment.setDefault(false);

        return userPaymentRepository.save(userPayment);
    }

    private void setNewPaymentAsDefault(List<UserPayment> oldPayments, UserPayment newDefaultPayment){
        Optional<UserPayment> oldDefaultPayment = oldPayments.stream()
                .filter(payment -> payment.getDefault() ).findFirst();

        if( oldDefaultPayment.isPresent() ){
            oldDefaultPayment.get().setDefault(false);
        }
        newDefaultPayment.setDefault(true);
        oldPayments.add(newDefaultPayment);
    }
	
}
