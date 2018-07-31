package com.skilldistillery.finance.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Expense;

public interface ExpenseRepo extends JpaRepository<Expense, Integer>{
	List<Expense> findByUser_UsernameAndDateBetween(String username, Date start, Date end);
	
	Expense findByUser_UsernameAndId(String username, int id);
	List<Expense> findByUser_Username(String username);

}
