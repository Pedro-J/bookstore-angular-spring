package com.bookstore.repository;

import com.bookstore.domain.OrderShipping;
import org.springframework.data.repository.CrudRepository;

public interface OrderShippingRepository extends CrudRepository<OrderShipping, Long> {
	
}
