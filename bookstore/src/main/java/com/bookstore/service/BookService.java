package com.bookstore.service;

import com.bookstore.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface BookService {
    Book save(Book book);
    Book findById(Long id);
    List<Book> findAll();
    Page<Book> search(Map<String, String> bookQuery);
    void remove(Long id) throws IOException;

    void saveImage(Long id, MultipartFile multipartFile);
}
