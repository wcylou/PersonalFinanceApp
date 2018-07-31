package com.skilldistillery.finance.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skilldistillery.finance.entities.Expense;

public interface ExpenseRepo extends JpaRepository<Expense, Integer>{
	@Query("select e from Expense e where e.user.id = :id")
	List<Expense> findByUser(Integer id);
	
	Expense findByUser_UsernameAndId(String username, int id);
	List<Expense> findByUser_Username(String username);

}
