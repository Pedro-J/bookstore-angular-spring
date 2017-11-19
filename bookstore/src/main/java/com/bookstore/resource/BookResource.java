package com.bookstore.resource;

import com.bookstore.domain.Book;
import com.bookstore.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Iterator;

@RestController
@RequestMapping("/book")
public class BookResource {

    private BookService bookService;

    @PostMapping("/add")
    public Book addBook(@RequestBody Book book){
        return bookService.save(book);
    }

    @PostMapping("/add/image")
    public ResponseEntity<String> upload(@RequestParam("id") Long id, HttpServletResponse response, HttpServletRequest request){
        try{
            Book book = bookService.findById(id);
            MultipartHttpServletRequest multipartRequst = (MultipartHttpServletRequest) request;
            Iterator<String> it = multipartRequst.getFileNames();
            MultipartFile multipartFile = multipartRequst.getFile(it.next());
            String fileName = id + ".png";

            byte[] fileContent = multipartFile.getBytes();

            File fileDestination = new File("src/main/resource/static/image/book/" + fileName);
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fileDestination));
            stream.write(fileContent);
            stream.close();

            return new ResponseEntity("Upload sucess", HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity("Upload failed", HttpStatus.BAD_REQUEST);
        }
    }


}
