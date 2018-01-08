package com.bookstore.resource;

import com.bookstore.domain.Book;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/book")
public class BookResource {

    private BookService bookService;

    public static final String BASE_URL = "/api/v1/bookstore";

    private final String bookImagesDirectory = "src/main/resources/static/image/book/";

    @Autowired
    public BookResource(BookService bookService){
        this.bookService = bookService;
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Book addBook(@RequestBody Book book){
        return bookService.save(book);
    }

    @PostMapping("/image/upload")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> upload(@RequestParam("id") Long id, HttpServletResponse response, HttpServletRequest request){
        try{
            Book book = bookService.findById(id);
            MultipartHttpServletRequest multipartRequst = (MultipartHttpServletRequest) request;
            Iterator<String> it = multipartRequst.getFileNames();
            MultipartFile multipartFile = multipartRequst.getFile(it.next());
            String fileName = id + ".png";

            byte[] fileContent = multipartFile.getBytes();

            File fileDestination = new File(bookImagesDirectory + fileName);

            if( fileDestination.exists() )
                Files.delete(Paths.get(bookImagesDirectory + fileName));

            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fileDestination));
            stream.write(fileContent);
            stream.close();

            return new ResponseEntity("Upload sucess", HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity("Upload failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Book updateBook(@RequestBody Book book){
        return bookService.save(book);
    }

    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public List<Book> getBooks(){
        return bookService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Book getBook(@PathVariable("id") Long id){
        return bookService.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        bookService.remove(id);
    }



}
