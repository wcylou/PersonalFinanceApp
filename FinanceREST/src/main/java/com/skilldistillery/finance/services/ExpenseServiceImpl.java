package com.skilldistillery.finance.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.entities.User;
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
		User user = userRepo.findOneByUsername(username);
		List<Expense> expenseList = exRepo.findByUser(user.getId());
		
		return expenseList;
	}
	
}
