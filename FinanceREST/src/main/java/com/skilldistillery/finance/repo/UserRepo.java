package com.skilldistillery.finance.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.User;

public interface UserRepo extends JpaRepository<User, Integer> {
		User findByUsername(String username);
		User findById(int id);
}
