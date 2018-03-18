package com.bookstore.repository;

import com.bookstore.domain.OrderPayment;
import org.springframework.data.repository.CrudRepository;

public interface OrderPaymentRepository extends CrudRepository<OrderPayment, Long>{

}
