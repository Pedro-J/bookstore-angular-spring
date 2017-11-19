package com.bookstore.service.impl;

import com.bookstore.domain.Book;
import com.bookstore.repository.BookRepository;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book findById(Long id) {
        return bookRepository.findOne(id);
    }

    @Override
    public List<Book> findAll() {
        List<Book> books = (List<Book>) bookRepository.findAll();
        List<Book> activeBooks = books.stream()
                                    .filter(book -> book.getActive().booleanValue())
                                    .collect(Collectors.toList());
        return activeBooks;
    }

    @Override
    public List<Book> search(String keyword) {
        List<Book> books = bookRepository.findByTitleContaining(keyword);
        List<Book> activeBooks = books.stream()
                .filter(book -> book.getActive().booleanValue())
                .collect(Collectors.toList());
        return activeBooks;
    }

    @Override
    public void remove(Long id) {
        bookRepository.delete(id);
    }
}
