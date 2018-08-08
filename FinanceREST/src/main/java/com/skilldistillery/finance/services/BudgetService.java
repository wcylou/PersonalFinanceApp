package com.skilldistillery.finance.services;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.skilldistillery.finance.entities.Budget;

public interface BudgetService {

	boolean destroy(String username, int id);

	Budget update(String username, int id, Budget budget);

	Budget create(String username, Budget budget);

	Budget show(String username, int id);

	List<Budget> indexBudget(String username);

	List<Budget> findBudgetByCategory(String username, int id);

	Map<String, Double> sortBudgetByCategory(String username);

	List<Budget> findBugetsBetweenDates(String username, Date startDate, Date endDate);

	TreeMap<String, Double> sortBudgetsByCategoryAndDate(String username, Date inputDate, Date todayDate);

}
