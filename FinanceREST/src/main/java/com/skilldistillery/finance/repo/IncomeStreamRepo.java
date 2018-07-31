package com.skilldistillery.finance.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.IncomeStream;

public interface IncomeStreamRepo extends JpaRepository<IncomeStream, Integer>{
	IncomeStream findByUser_UsernameAndId(String username, int id);
	List<IncomeStream> findByUser_Username(String username);
}
