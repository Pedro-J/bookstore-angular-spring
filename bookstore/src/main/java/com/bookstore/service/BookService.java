package com.bookstore.service;

import com.bookstore.domain.Book;
import com.bookstore.domain.User;

import java.util.List;

public interface BookService {
    Book save(Book book);
    Book findById(Long id);
    List<Book> findAll();
    List<Book> search(String title);
    void remove(Long id);

}
