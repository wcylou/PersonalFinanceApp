package com.skilldistillery.finance.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.FutureExpense;

public interface FutureExpenseRepo extends JpaRepository<FutureExpense, Integer>{
	List<FutureExpense> findByUser_Username(String username);
	FutureExpense findByUser_UsernameAndId(String username, int id);


}
