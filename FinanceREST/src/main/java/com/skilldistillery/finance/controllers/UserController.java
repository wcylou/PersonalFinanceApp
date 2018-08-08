package com.skilldistillery.finance.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.User;
import com.skilldistillery.finance.services.UserService;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class UserController {
	
	@Autowired
	UserService userServ;	
	
	@RequestMapping(path="users/{username}", method = RequestMethod.GET)
	public User findUserByUserName(@PathVariable String username, Principal principal){
		
		return userServ.findByUserName(username);
		
	}
	
	@RequestMapping(path="users", method= RequestMethod.GET)
	public List<User> index(Principal principal) {
		return userServ.indexUser();
	}
	
//	@RequestMapping(path="users/{id}", method = RequestMethod.GET) 
//	public User getOneUser(@PathVariable int id, Principal principal) {
//		return userServ.show(id);
//	}
	
	@RequestMapping(path="users", method = RequestMethod.POST) 
	public User createUser(@RequestBody User user, Principal principal) {
		return userServ.create(user);
	}
	
	@RequestMapping(path="users/{id}", method = RequestMethod.PATCH) 
	public User updateUser(@PathVariable int id, @RequestBody User user, Principal principal) {
		return userServ.update(id, user);
	}
	
	@RequestMapping(path="users/{id}", method = RequestMethod.DELETE)
	public boolean deleteUser(@PathVariable int id, Principal principal) {
		return userServ.destroy(id);
	}

}
