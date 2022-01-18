package com.bulltar.backend.controller;

import com.bulltar.backend.model.User;
import com.bulltar.backend.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping
    List<User> findAll(){
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    User findById(@PathVariable Long id){
        return userRepository.getById(id);
    }

    @PostMapping
    public User create(@RequestBody final User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.saveAndFlush(user);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public User update(@PathVariable Long id, @RequestBody User user){
        User currentUser = userRepository.getById(id);
        if(user.getPassword() != currentUser.getPassword()) user.setPassword(encoder.encode(user.getPassword()));
        BeanUtils.copyProperties(user, currentUser, "id");
        return userRepository.saveAndFlush(currentUser);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        userRepository.deleteById(id);
    }





}
