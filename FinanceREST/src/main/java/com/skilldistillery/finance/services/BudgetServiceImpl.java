package com.skilldistillery.finance.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Budget;
import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.repo.BudgetRepo;
import com.skilldistillery.finance.repo.UserRepo;

@Service
public class BudgetServiceImpl implements BudgetService{
	@Autowired
	BudgetRepo budRepo;
	@Autowired
	UserRepo userRepo;
	
	@Override
	public List<Budget> findBudgetByCategory(String username, int id) {
		return budRepo.findByUser_UsernameAndExpenseCategory_Id(username, id);
	}
	
	@Override
	public List<Budget> indexBudget(String username) {
		return budRepo.findByUser_Username(username);
	}
	
	@Override
	public Budget show(String username, int id) {
		return budRepo.findByUser_UsernameAndId(username, id);
	}
	
	@Override
	public Budget create(String username, Budget budget) {
		budget.setUser(userRepo.findByUsername(username));
		return budRepo.saveAndFlush(budget);
	}
	
	@Override
	public Budget update(String username, int id, Budget budget) {
		Budget e = show(username, id);
		e.setAmount(budget.getAmount());
		e.setStartDate(budget.getStartDate());
		e.setEndDate(budget.getEndDate());
		e.setDescription(budget.getDescription());
		e.setExpenseCategory(budget.getExpenseCategory());
		return budRepo.saveAndFlush(e);
	}
	
	@Override
	public boolean destroy(String username, int id) {
		try {
			budRepo.delete(show(username, id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
