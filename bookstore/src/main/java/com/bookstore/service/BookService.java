package com.bookstore.service;

import com.bookstore.domain.Book;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BookService {
    Book save(Book book);
    Book findById(Long id);
    List<Book> findAll();
    Page<Book> search(String title);
    void remove(Long id);
}
