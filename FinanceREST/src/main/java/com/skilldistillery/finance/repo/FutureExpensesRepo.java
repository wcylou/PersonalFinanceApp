package com.skilldistillery.finance.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.FutureExpenses;

public interface FutureExpensesRepo extends JpaRepository<FutureExpenses, Integer>{

}
