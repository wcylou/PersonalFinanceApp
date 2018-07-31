package com.skilldistillery.finance.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.ExpenseCategory;

public interface ExpenseCategoryRepo extends JpaRepository<ExpenseCategory, Integer>{

}
