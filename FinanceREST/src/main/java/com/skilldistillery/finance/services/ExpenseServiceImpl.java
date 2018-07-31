package com.skilldistillery.finance.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.repo.ExpenseRepo;
import com.skilldistillery.finance.repo.UserRepo;

@Service
public class ExpenseServiceImpl implements ExpenseService{
	
	@Autowired
	ExpenseRepo exRepo;
	@Autowired
	UserRepo userRepo;
	
	@Override
	public List<Expense> indexExpenses(String username) {
		return exRepo.findByUser_Username(username);
	}
	
	@Override
	public Expense show(String username, int id) {
		return exRepo.findByUser_UsernameAndId(username, id);
	}
	
	@Override
	public Expense create(String username, Expense expense) {
		expense.setUser(userRepo.findByUsername(username));
		return exRepo.saveAndFlush(expense);
	}
	
	@Override
	public Expense update(String username, int id, Expense expense) {
		Expense e = show(username, id);
		e.setAmount(expense.getAmount());
		e.setDate(expense.getDate());
		e.setDescription(expense.getDescription());
		e.setExpenseCategory(expense.getExpenseCategory());
		e.setUser(expense.getUser());
		return exRepo.saveAndFlush(e);
	}
	
	@Override
	public boolean destroy(String username, int id) {
		try {
			exRepo.delete(show(username, id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
