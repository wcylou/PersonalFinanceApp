package com.skilldistillery.finance.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Budget;

public interface BudgetRepo extends JpaRepository<Budget, Integer>{
		List<Budget> findByUser_Username(String username);
		Budget findByUser_UsernameAndId(String username, int id);
		List<Budget> findByUser_UsernameAndExpenseCategory_Id(String username, int id);
}
