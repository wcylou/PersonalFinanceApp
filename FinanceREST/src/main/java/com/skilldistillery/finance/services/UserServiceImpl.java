package com.skilldistillery.finance.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.User;
import com.skilldistillery.finance.repo.UserRepo;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepo userRepo;
	
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
