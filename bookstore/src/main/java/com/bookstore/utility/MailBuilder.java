package com.bookstore.utility;

import com.bookstore.domain.Order;
import com.bookstore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Locale;

@Component
public class MailBuilder {

	private Environment env;

    private JavaMailSender mailSender;

    private TemplateEngine templateEngine;

	@Autowired
	public MailBuilder(JavaMailSender mailSender, Environment env, TemplateEngine templateEngine) {
		this.mailSender = mailSender;
		this.env = env;
        this.templateEngine = templateEngine;
	}

	private SimpleMailMessage constructNewUserEmail(User user, String password) {
		String message="\nPlease use the following credentials to log in and edit your personal information including your own password."
				+ "\nUsername:"+user.getUsername()+"\nPassword:"+password;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Le's Bookstore - New User");
        mailMessage.setText(message);
        mailMessage.setFrom(env.getProperty("support.email"));

        return mailMessage;
	}

	public void sendNewUserMail(User user, String password){
	    mailSender.send(constructNewUserEmail(user, password));
    }


    private MimeMessagePreparator constructOrderConfirmationEmail(User user, Order order, Locale locale) {
        Context context = new Context();
        context.setVariable("order", order);
        context.setVariable("user", user);
        context.setVariable("cartItemList", order.getCartItemList());
        String text = templateEngine.process("orderConfirmationEmailTemplate", context);

        return new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
                email.setTo(user.getEmail());
                email.setSubject("Order Confirmation - " + order.getId());
                email.setText(text,true);
                email.setFrom(new InternetAddress("mail.sample@test.com")); //TODO
            }
        };
    }

    public void sendOrderConfirmationMail(User user, Order order, Locale locale){
	    mailSender.send(constructOrderConfirmationEmail(user, order, locale));
    }

}
