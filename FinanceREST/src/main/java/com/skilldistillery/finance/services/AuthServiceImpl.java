package com.skilldistillery.finance.services;

import java.io.IOException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skilldistillery.finance.entities.User;
import com.skilldistillery.finance.repo.UserRepo;

@Transactional
@Repository
public class AuthServiceImpl implements AuthService {

	@PersistenceContext
	private EntityManager em;

	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private UserRepo userRepo;

	@Override
	public User register(String json) {
		ObjectMapper om = new ObjectMapper();
		User user = null;
		try {
			user = om.readValue(json, User.class);
			String encodedPassword = encoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
			user.setRole("standard");
			user.setActive(true);
			System.out.println(user.getPassword());
			System.out.println(user);
			userRepo.saveAndFlush(user);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return user;
	}
}
