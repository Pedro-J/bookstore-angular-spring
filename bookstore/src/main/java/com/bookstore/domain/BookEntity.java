package com.bookstore.domain;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_book")
public class Book implements Serializable{

    private static final long serialVersionUID = 44512331222L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String publisher;
    private String publicationDate;
    private String language;
    private String category;
    private Integer numberOfPages;
    private String format;
    private String isbn;
    private Double shippingWeight;
    private Double listPrice;
    private Double ourPrice;
    private Integer inStockNumber;
    private Boolean active = true;

    @Column(columnDefinition = "text")
    private String description;

    @Transient
    private MultipartFile bookImage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(Integer numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Double getShippingWeight() {
        return shippingWeight;
    }

    public void setShippingWeight(Double shippingWeight) {
        this.shippingWeight = shippingWeight;
    }

    public Double getListPrice() {
        return listPrice;
    }

    public void setListPrice(Double listPrice) {
        this.listPrice = listPrice;
    }

    public Double getOurPrice() {
        return ourPrice;
    }

    public void setOurPrice(Double ourPrice) {
        this.ourPrice = ourPrice;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MultipartFile getBookImage() {
        return bookImage;
    }

    public void setBookImage(MultipartFile bookImage) {
        this.bookImage = bookImage;
    }

    public Integer getInStockNumber() {
        return inStockNumber;
    }

    public void setInStockNumber(Integer inStockNumber) {
        this.inStockNumber = inStockNumber;
    }

}
