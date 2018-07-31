package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Expense;

public interface ExpenseService {

	List<Expense> indexExpenses(String username);
	Expense show(String username, int id);
	Expense create(String username, Expense expense);
	Expense update(String username, int id, Expense expense);
	boolean destroy(String username, int id);

}
