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
	public User findUserByUserName(String username) {

		return userRepo.findByUsername(username);
	}
	
	
}
