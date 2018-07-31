package com.skilldistillery.finance.services;

import com.skilldistillery.finance.entities.User;

public interface UserService {

	User findUserByUserName(String username);
}
