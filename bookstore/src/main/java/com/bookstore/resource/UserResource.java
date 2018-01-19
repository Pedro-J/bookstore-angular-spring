package com.bookstore.resource;

import com.bookstore.domain.User;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;


@RestController
@RequestMapping(UserResource.BASE_URL)
public class UserResource {

    public static final String BASE_URL = "/bookstore/api/v1/users";

    private UserService userService;

    @Autowired
    public UserResource(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public User addNewUser(@RequestBody Map<String, String> mapper) {
        String email = mapper.get("email");
        String username = mapper.get("username");
        return userService.createUser(new User(email, username));
    }

    @RequestMapping(value = "/forgetPassword", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void forgetPassword(@RequestBody Map<String, String> mapper) {
        userService.updateForgottenPassword(mapper.get("email"));
    }

    @PutMapping("{id}/update")
    @ResponseStatus(HttpStatus.OK)
    public void updateProfileInfo(@PathVariable("id") Long id, @RequestBody User modifiedUser) {
        User currentUser = userService.findById(id);
        userService.updateProfile(modifiedUser, currentUser);
    }

    @RequestMapping("/current")
    @ResponseStatus(HttpStatus.OK)
    public User getCurrentUser(Principal principal) {
        User user = new User();
        if ( principal != null ) {
            user = userService.findByUsername(principal.getName());
        }
        return user;
    }
}
