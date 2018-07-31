package com.skilldistillery.finance.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Expense;

public interface ExpenseRepo extends JpaRepository<Expense, Integer>{

}
