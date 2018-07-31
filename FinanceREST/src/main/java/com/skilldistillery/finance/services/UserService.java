package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.User;

public interface UserService {

	User create(User user);
	User show(int id);
	User update(int id, User user);
	boolean destroy(int id);

}
