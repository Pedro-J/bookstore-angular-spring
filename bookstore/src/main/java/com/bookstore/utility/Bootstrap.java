package com.bookstore.utility;

import com.bookstore.config.SecurityUtility;
import com.bookstore.domain.*;
import com.bookstore.domain.security.Role;
import com.bookstore.domain.security.UserRole;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.UserPaymentRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.repository.UserShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class Bootstrap {

    private UserRepository userRepository;
    private BookRepository bookRepository;
    private UserShippingRepository userShippingRepository;
    private UserPaymentRepository userPaymentRepository;

    @Autowired
    public Bootstrap(UserRepository userRepository, BookRepository bookRepository, UserShippingRepository userShippingRepository, UserPaymentRepository userPaymentRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.userShippingRepository = userShippingRepository;
        this.userPaymentRepository = userPaymentRepository;
    }

    public void start() {
        createUsers();
        createBooks();
        createUserPayment();
        createUserShipping();
    }

    private void createUsers() {

        Role role = new Role(1, "ROLE_USER");

        User user1 = new User();
        user1.setFirstName("John");
        user1.setLastName("Adams");
        user1.setUsername("j");
        user1.setPassword(SecurityUtility.passwordEncoder().encode("p"));
        user1.setEmail("JAdams@gmail.com");
        user1.getUserRoles().addAll(Arrays.asList(new UserRole(user1, role)));

        user1.setShoppingCart(new ShoppingCart(user1));


        User user2 = new User();
        user2.setFirstName("Admin");
        user2.setLastName("Admin");
        user2.setUsername("admin");
        user2.setPassword(SecurityUtility.passwordEncoder().encode("p"));
        user2.setEmail("Admin@gmail.com");
        user2.getUserRoles().addAll(Arrays.asList(new UserRole(user2, role)));

        user2.setShoppingCart(new ShoppingCart(user2));

        userRepository.save(Arrays.asList(user1, user2));

    }

    private void createBooks() {
        Book book = new Book();
        book.setAuthor("Jõao José");
        book.setBookImage(null);
        book.setActive(true);
        book.setDescription("<p><span style=\"color: #333333; font-family: Arial, sans-serif;\">(Guitar Solo). 15 jazzy solo guitar arrangements of Davis classics, including: All Blues * All of You * Blue in Green * Bye Bye Blackbird * Four * Freddie Freeloader * I Could Write a Book * Milestones * Nardis * Nefertiti * Seven Steps to Heaven * So What * Solar * There Is No Greater Love * When I Fall in Love. The CD includes full demos of each piece by Jamie Findlay.</span></p>'");
        book.setInStockNumber(10);
        book.setCategory("História");
        book.setTitle("Primeiro Governo");
        book.setFormat("paperback");
        book.setIsbn("16");
        book.setListPrice(10.1);
        book.setLanguage("English");
        book.setPublicationDate("03/06/1998");
        book.setShippingWeight(1.1);

        Book book2 = new Book();
        book2.setAuthor("Juan Alvarez");
        book2.setBookImage(null);
        book2.setActive(true);
        book2.setDescription("<p style=\"margin: 0px 0px 14px; padding: 0px; color: #333333;" +
                " font-family: Arial, sans-serif;\"><strong>An all-new, jewel-like, reader-friendly" +
                " format gives new life to this relaunch of an international best-seller." +
                "</strong></p>\r\n<p style=\"margin: -4px 0px 14px; padding: 0px; color: #333333;" +
                " font-family: Arial, sans-serif;\">&nbsp;</p>\r\n<p style=\"margin: -4px 0px 14px; " +
                "padding: 0px; color: #333333; font-family: Arial, sans-serif;\">Leonardo da Vinci?artist," +
                " inventor, and prototypical Renaissance man?is a perennial source of fascination because of " +
                "his astonishing intellect and boundless curiosity about the natural and man-made world. " +
                "During his life he created numerous works of art and kept voluminous notebooks that detailed " +
                "his artistic and intellectual pursuits.</p>\r\n<p style=\"margin: -4px 0px 14px; " +
                "padding: 0px; color: #333333; font-family: Arial, sans-serif;\">&nbsp;</p>\r\n" +
                "<p style=\"margin: -4px 0px 14px; padding: 0px; color: #333333; font-family: Arial, sans-serif;\">" +
                "The collection of writings and art in this magnificent book are drawn from his notebooks." +
                " The book organizes his wide range of interests into subjects such as human figures");
        book2.setInStockNumber(10);
        book2.setCategory("Filosófia");
        book2.setTitle("Universo");
        book2.setFormat("paperback");
        book2.setIsbn("15");
        book2.setListPrice(115.0);
        book2.setLanguage("Spanish");
        book2.setPublicationDate("03/12/1999");
        book2.setShippingWeight(2.1);

        bookRepository.save(Arrays.asList(book, book2));

    }


    private void createUserShipping() {

        User user = userRepository.findByEmail("Admin@gmail.com");
        User user2 = userRepository.findByEmail("JAdams@gmail.com");

        UserShipping shipping = new UserShipping();
        shipping.setCity("Los Angeles");
        shipping.setCountry("EUA");
        shipping.setName("Billing Default");
        shipping.setState("CA");
        shipping.setStreet1("John R.");
        shipping.setStreet2("John R.");
        shipping.setZipcode("44444-222");
        shipping.setUser(user);

        UserShipping shipping2 = new UserShipping();
        shipping2.setCity("Toronto");
        shipping2.setCountry("Canada");
        shipping2.setName("Billing Default");
        shipping2.setState("ONT");
        shipping2.setStreet1("Ruan F.");
        shipping2.setStreet2("Ruan F.");
        shipping2.setZipcode("55555-222");
        shipping2.setUser(user2);

        userShippingRepository.save(Arrays.asList(shipping, shipping2));

    }

    private void createUserPayment() {
        User user = userRepository.findByEmail("Admin@gmail.com");
        User user2 = userRepository.findByEmail("JAdams@gmail.com");


        UserBilling billing = new UserBilling();
        billing.setCity("Los Angeles");
        billing.setCountry("EUA");
        billing.setName("Billing Default");
        billing.setState("CA");
        billing.setStreet1("John R.");
        billing.setStreet2("John R.");
        billing.setZipcode("44444-222");

        UserPayment userPayment = new UserPayment();
        userPayment.setDefault(true);
        userPayment.setCardName("AAA AA A");
        userPayment.setCardNumber("2115 5551 6663 3325");
        userPayment.setCvc(441);
        userPayment.setExpiryMonth(03);
        userPayment.setExpiryYear(2020);
        userPayment.setUser(user);
        userPayment.setHolderName("AAA");
        userPayment.setType("visa");
        userPayment.setUserBilling(billing);


        billing = new UserBilling();
        billing.setCity("Toronto");
        billing.setCountry("Canada");
        billing.setName("Billing Default");
        billing.setState("ONT");
        billing.setStreet1("Ruan F.");
        billing.setStreet2("Ruan F.");
        billing.setZipcode("55555-222");

        UserPayment userPayment2 = new UserPayment();
        userPayment2.setDefault(true);
        userPayment2.setCardName("BBBB BB B");
        userPayment2.setCardNumber("2223 1113 6663 3325");
        userPayment2.setCvc(778);
        userPayment2.setExpiryMonth(12);
        userPayment2.setExpiryYear(2022);
        userPayment2.setUser(user2);
        userPayment2.setHolderName("BBB");
        userPayment2.setType("mastercard");
        userPayment2.setUserBilling(billing);

        userPaymentRepository.save(Arrays.asList(userPayment, userPayment2));
    }

}
