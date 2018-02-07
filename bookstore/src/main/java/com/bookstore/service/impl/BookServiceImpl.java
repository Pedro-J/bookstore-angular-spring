package com.bookstore.service.impl;

import com.bookstore.domain.Book;
import com.bookstore.repository.BookRepository;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Transactional( readOnly = true )
    public Book findById(Long id) {
        return bookRepository.findOne(id);
    }

    @Transactional( readOnly = true )
    public List<Book> findAll() {
        List<Book> books = (List<Book>) bookRepository.findAll();
        List<Book> activeBooks = books.stream()
                                    .filter(book -> book.getActive().booleanValue())
                                    .collect(Collectors.toList());
        return activeBooks;
    }

    @Transactional( readOnly = true )
    public List<Book> search(String keyword) {
        List<Book> books = bookRepository.findByTitleContaining(keyword);
        List<Book> activeBooks = books.stream()
                .filter(book -> book.getActive().booleanValue())
                .collect(Collectors.toList());
        return activeBooks;
    }

    public void remove(Long id) {
        bookRepository.delete(id);
    }
}
