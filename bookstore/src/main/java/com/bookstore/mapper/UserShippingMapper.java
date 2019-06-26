package com.bookstore.mapper;

import com.bookstore.domain.BookEntity;
import com.bookstore.domain.UserShippingEntity;
import com.bookstore.rest.contract.request.BookRequest;
import com.bookstore.rest.contract.response.BookResponse;
import org.mapstruct.factory.Mappers;

public interface ShippingMapper {

    ShippingMapper INSTANCE = Mappers.getMapper(ShippingMapper.class);

    BookResponse toBookResponse(BookEntity book);

    UserShippingEntity toUserShippingEntity(BookRequest bookRequest);
}
