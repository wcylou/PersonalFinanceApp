package com.skilldistillery.finance.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skilldistillery.finance.entities.User;
import com.skilldistillery.finance.repo.UserRepo;

@Transactional
@Repository 
@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	UserRepo userRepo;
	

	
	@Override
	public List<User> indexUser() {
		return userRepo.findAll();
	}
	
	@Override
	public User show(int id) {
		return userRepo.findById(id);
	}
	
	@Override
	public User create(User user) {
		return userRepo.saveAndFlush(user);
	}
	
	@Override
	public User update(int id, User user) {
		User u = show(id);
		u.setUsername(user.getUsername());
		u.setPassword(user.getPassword());
		u.setEmail(user.getEmail());
		System.out.println(u);
		return userRepo.saveAndFlush(u);
	}
	
	@Override
	public boolean destroy(int id) {
		try {
			userRepo.delete(show(id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	
}
