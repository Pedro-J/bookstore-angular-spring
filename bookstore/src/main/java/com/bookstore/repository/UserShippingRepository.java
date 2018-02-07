package com.bookstore.repository;

import com.bookstore.domain.User;
import com.bookstore.domain.UserShipping;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserShippingRepository extends CrudRepository<UserShipping, Long> {

    List<UserShipping> findByUser(User user);
}
