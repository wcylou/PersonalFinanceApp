package com.skilldistillery.finance.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Budget;

public interface BudgetRepo extends JpaRepository<Budget, Integer>{

}
