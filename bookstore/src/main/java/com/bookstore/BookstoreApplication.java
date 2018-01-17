package com.bookstore;

import com.bookstore.config.SecurityUtility;
import com.bookstore.domain.User;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookstoreApplication implements CommandLineRunner {
	
	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(BookstoreApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {

		if ( userService.findByUsername("j") == null ){
			User user1 = new User();
			user1.setFirstName("John");
			user1.setLastName("Adams");
			user1.setUsername("j");
			user1.setPassword(SecurityUtility.passwordEncoder().encode("p"));
			user1.setEmail("JAdams@gmail.com");

			userService.createUser(user1);
		}

		if ( userService.findByUsername("admin") == null ) {
			User user2 = new User();
			user2.setFirstName("Admin");
			user2.setLastName("Admin");
			user2.setUsername("admin");
			user2.setPassword(SecurityUtility.passwordEncoder().encode("p"));
			user2.setEmail("Admin@gmail.com");

			userService.createUser(user2);
		}
	}

}
