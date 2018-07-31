package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Budget;

public interface BudgetService {

	boolean destroy(String username, int id);

	Budget update(String username, int id, Budget budget);

	Budget create(String username, Budget budget);

	Budget show(String username, int id);

	List<Budget> indexBudget(String username);

}
