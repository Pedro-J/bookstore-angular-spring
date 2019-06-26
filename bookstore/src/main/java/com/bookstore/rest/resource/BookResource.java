package com.bookstore.rest.resource;

import com.bookstore.domain.BookEntity;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(BookResource.BASE_URL)
public class BookResource {

    private BookService bookService;

    public static final String BASE_URL = "/bookstore/api/v1/books";

    @Autowired
    public BookResource(BookService bookService){
        this.bookService = bookService;
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public BookEntity addNewBook(@RequestBody BookEntity book){
        return bookService.save(book);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public BookEntity updateBook(@RequestBody BookEntity book){
        return bookService.save(book);
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public List<BookEntity> getBooks(){
        return bookService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BookEntity getBook(@PathVariable("id") Long id){
        return bookService.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBook(@PathVariable Long id) throws IOException {
        bookService.remove(id);
    }

    @PostMapping("/image/upload")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveBookImage(@RequestParam("id") Long id, HttpServletRequest request) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        Iterator<String> it = multipartRequest.getFileNames();
        MultipartFile multipartFile = multipartRequest.getFile(it.next());

        bookService.saveImage(id, multipartFile);
    }


    @PostMapping("/update/image")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateBookImage(@RequestParam("id") Long id, HttpServletRequest request){
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        Iterator<String> it = multipartRequest.getFileNames();
        MultipartFile multipartFile = multipartRequest.getFile(it.next());

        bookService.saveImage(id, multipartFile);
    }

    @PostMapping("/book/search")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookEntity> searchBook(@RequestBody Map<String, String> bookQuery){
        return bookService.search(bookQuery);
    }


}
