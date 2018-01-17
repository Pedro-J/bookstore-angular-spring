package com.bookstore.service.impl;

import com.bookstore.config.SecurityUtility;
import com.bookstore.domain.User;
import com.bookstore.domain.security.Role;
import com.bookstore.domain.security.UserRole;
import com.bookstore.exception.BadRequestException;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.repository.RoleRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.UserService;
import com.bookstore.utility.MailBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional( readOnly = true )
public class UserServiceImpl implements UserService{
	
	private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

	private UserRepository userRepository;

	private RoleRepository roleRepository;

	private MailBuilder mailBuilder;

	private JavaMailSender mailSender;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, MailBuilder mailBuilder, JavaMailSender mailSender) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.mailBuilder = mailBuilder;
		this.mailSender = mailSender;
	}

	public User findById(Long id) {
		return userRepository.findOne(id);
	}

	@Transactional
	public User createUser(User user) {
		User savedUser = userRepository.findByUsername(user.getUsername());

		if (userRepository.findByUsername(user.getUsername()) != null) {
			throw new BadRequestException("usernameExists");
		}

		if (userRepository.findByEmail(user.getEmail()) != null) {
			throw new BadRequestException("emailExists");
		}
		
		if( savedUser != null ) {
			LOG.info("User with username {} already exist. Nothing will be done. ", user.getUsername());
		} else {
			Role role = new Role();
			role.setRoleId(1);
			role.setName("ROLE_USER");
			Set<UserRole> userRoles = new HashSet<>();
			userRoles.add(new UserRole(user, role));
			
			user.getUserRoles().addAll(userRoles);
			
			userRepository.save(user);

			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}

			String password = SecurityUtility.randomPassword();

			String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
			user.setPassword(encryptedPassword);

			savedUser = userRepository.save(user);

			SimpleMailMessage email = mailBuilder.constructNewUserEmail(user, password);
			mailSender.send(email);
		}
		
		return savedUser;
	}

	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Transactional
	public void updateForgottenPassword(String email) {

		User user = userRepository.findByEmail(email);

		if ( user == null ) {
			throw new BadRequestException("emailNotFound");
		}

		String password = SecurityUtility.randomPassword();

		String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
		user.setPassword(encryptedPassword);
		userRepository.save(user);

		SimpleMailMessage newEmail = mailBuilder.constructNewUserEmail(user, password);
		mailSender.send(newEmail);
	}

	@Transactional
	public void updateProfile(User modifiedUser, User currentUser){

		if( currentUser == null ) {
			throw new ResourceNotFoundException();
		}

		if( userRepository.findByEmail(modifiedUser.getEmail()) != null ) {
			if( userRepository.findByEmail(modifiedUser.getEmail()).getId() != currentUser.getId() ) {
				throw new BadRequestException("Email not found!");
			}
		}

		if( userRepository.findByUsername(modifiedUser.getUsername()) != null ) {
			if( userRepository.findByUsername(modifiedUser.getUsername()).getId() != currentUser.getId() ) {
				throw new BadRequestException("Username not found!");
			}
		}

		BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
		String dbPassword = currentUser.getPassword();

		if ( modifiedUser.getPassword() != null ) {

			if ( !passwordEncoder.matches(currentUser.getPassword(), dbPassword) ) {
				throw new BadRequestException("Incorrect current password!");
			}

			if ( modifiedUser.getNewPassword() != null && !modifiedUser.getNewPassword().equals("")) {
				currentUser.setPassword(passwordEncoder.encode(modifiedUser.getNewPassword()));
			}
			currentUser.setEmail(modifiedUser.getEmail());

			currentUser.setFirstName(modifiedUser.getFirstName());
			currentUser.setLastName(modifiedUser.getLastName());
			currentUser.setUsername(modifiedUser.getUsername());

			update(currentUser);
		}

	}

	public void update(User user) {
		userRepository.save(user);
	}

}
