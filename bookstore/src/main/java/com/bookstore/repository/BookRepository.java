package com.bookstore.repository;

import com.bookstore.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookRepository extends PagingAndSortingRepository<Book, Long> {
    Page<Book> findByTitleContaining(String keyword);
}
