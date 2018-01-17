package com.bookstore.resource;

import com.bookstore.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping(LoginResource.BASE_URL)
public class LoginResource {

    public static final String BASE_URL = "/bookstore/api/v1";

    private UserService userService;

    public LoginResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/token")
    public Map<String, String> getToken(HttpSession session, HttpServletRequest request){
        System.out.println(request.getRemoteHost());

        String remoteHost = request.getRemoteHost();
        int portNumber = request.getRemotePort();

        System.out.println(remoteHost + ":" + portNumber);
        System.out.println(request.getRemoteAddr());

        return Collections.singletonMap("token", session.getId());
    }

    @GetMapping("/session/active")
    @ResponseStatus(HttpStatus.OK)
    public String checkSession(){
        return "Session Active!";
    }

    @PostMapping("/user/logout")
    @ResponseStatus(HttpStatus.OK)
    public String logout(){
        SecurityContextHolder.clearContext();
        return "Logout successfully";
    }
}
