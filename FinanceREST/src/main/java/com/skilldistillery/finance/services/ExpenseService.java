package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Expense;

public interface ExpenseService {

	List<Expense> indexExpenses(String username);

}
