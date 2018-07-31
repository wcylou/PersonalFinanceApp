package com.skilldistillery.finance.services;

import java.util.Date;
import java.util.List;

import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.entities.ExpenseCategory;
import com.skilldistillery.finance.entities.FutureExpense;

public interface ExpenseService {

	List<Expense> indexExpenses(String username);
	Expense show(String username, int id);
	Expense create(String username, Expense expense);
	Expense update(String username, int id, Expense expense);
	boolean destroy(String username, int id);
	
	List<FutureExpense> indexFutureExpenses(String username);
	FutureExpense showFex(String username, int id);
	FutureExpense createFex(String username, FutureExpense expense);
	FutureExpense updateFex(String username, int id, FutureExpense expense);
	boolean destroyFex(String username, int id);
	List<Expense> findExpensesBetweenDates(Date start, Date end, String username);
	List<ExpenseCategory> indexExpenseCategory();
	List<Expense> findExpensesByCategory(String username, int id);

}
