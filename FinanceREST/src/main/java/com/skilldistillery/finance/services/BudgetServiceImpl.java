package com.skilldistillery.finance.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

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
	public Map<String, Double> sortBudgetByCategory(String username) {
	Map<String, Double> aggCat = new HashMap<>();
	List<Budget> allBudgets = indexBudget(username);
	for (int i = 0; i < allBudgets.size(); i++) {
		if (!aggCat.containsKey(allBudgets.get(i).getExpenseCategory().getName())) {
			aggCat.put(allBudgets.get(i).getExpenseCategory().getName(), allBudgets.get(i).getAmount());
		}
		else {
			aggCat.put(allBudgets.get(i).getExpenseCategory().getName(), 
			aggCat.get(allBudgets.get(i).getExpenseCategory().getName()) + allBudgets.get(i).getAmount());
		}
	}
	return aggCat;
	}
	
	@Override
	public TreeMap<String, Double> sortBudgetsByCategoryAndDate(String username, Date inputDate, Date todayDate) {
		TreeMap<String, Double> aggCat = new TreeMap<>();
		List<Budget> allBudgets = findBugetsBetweenDates(username, inputDate, todayDate);
		System.out.println(allBudgets);
		for (int i = 0; i < allBudgets.size(); i++) {
			if (!aggCat.containsKey(allBudgets.get(i).getExpenseCategory().getName())) {
				aggCat.put(allBudgets.get(i).getExpenseCategory().getName(), allBudgets.get(i).getAmount());
			}
			else {
				aggCat.put(allBudgets.get(i).getExpenseCategory().getName(), 
				aggCat.get(allBudgets.get(i).getExpenseCategory().getName()) + allBudgets.get(i).getAmount());
			}
		}
		System.out.println(aggCat);
		return aggCat;
	}
	
	
	@Override
	public List<Budget> findBugetsBetweenDates(String username, Date startDate, Date endDate) {	
		return budRepo.findByUser_UsernameAndStartDateGreaterThanEqualAndEndDateLessThanEqual(username, startDate, endDate);
	}
	
	@Override
	public List<Budget> findBudgetByCategory(String username, int id) {
		return budRepo.findByUser_UsernameAndExpenseCategory_Id(username, id);
	}
	
	@Override
	public List<Budget> indexBudget(String username) {
		return budRepo.findByUser_UsernameOrderByStartDateDesc(username);
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
