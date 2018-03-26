package com.bookstore.utility;

import com.bookstore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;

@Component
public class MailBuilder {

	private JavaMailSender mailSender;

	private Environment env;

    SimpleMailMessage mailMessage;

	@Autowired
	public MailBuilder(JavaMailSender mailSender, Environment env) {
		this.mailSender = mailSender;
		this.env = env;
	}

	public void constructNewUserEmail(User user, String password) {
		String message="\nPlease use the following credentials to log in and edit your personal information including your own password."
				+ "\nUsername:"+user.getUsername()+"\nPassword:"+password;
		
		mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Le's Bookstore - New User");
        mailMessage.setText(message);
        mailMessage.setFrom(env.getProperty("support.email"));
	}

    public MimeMessagePreparator constructOrderConfirmationEmail (User user, Order order, Locale locale) {
        Context context = new Context();
        context.setVariable("order", order);
        context.setVariable("user", user);
        context.setVariable("cartItemList", order.getCartItemList());
        String text = templateEngine.process("orderConfirmationEmailTemplate", context);

        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
                email.setTo(user.getEmail());
                email.setSubject("Order Confirmation - "+order.getId());
                email.setText(text,true);
                email.setFrom(new InternetAddress("ray.deng83@gmail.com"));
            }
        };

        return messagePreparator;
    }

	public void send(){
	    mailSender.send(mailMessage);
    }

}
