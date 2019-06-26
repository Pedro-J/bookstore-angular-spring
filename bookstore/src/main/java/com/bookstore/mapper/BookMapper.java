package com.bookstore.rest.mapper;

import com.bookstore.domain.BookEntity;
import com.bookstore.rest.contract.request.BookRequest;
import com.bookstore.rest.contract.response.BookResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BookMapper {

    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    BookResponse toBookResponse(BookEntity book);

    BookEntity toBookEntity(BookRequest bookRequest);
}
