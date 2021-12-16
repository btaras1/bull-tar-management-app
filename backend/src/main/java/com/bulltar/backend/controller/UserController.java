package com.bulltar.backend.controller;

import com.bulltar.backend.model.User;
import com.bulltar.backend.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

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
        return userRepository.saveAndFlush(user);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public User update(@PathVariable Long id, @RequestBody User user){
        User currentUser = userRepository.getById(id);
        BeanUtils.copyProperties(user, currentUser, "id");
        return currentUser;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        userRepository.deleteById(id);
    }


}
