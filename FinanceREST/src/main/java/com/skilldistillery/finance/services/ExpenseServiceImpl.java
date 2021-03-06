package com.skilldistillery.finance.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.entities.ExpenseCategory;
import com.skilldistillery.finance.entities.FutureExpense;
import com.skilldistillery.finance.repo.ExpenseCategoryRepo;
import com.skilldistillery.finance.repo.ExpenseRepo;
import com.skilldistillery.finance.repo.FutureExpenseRepo;
import com.skilldistillery.finance.repo.UserRepo;

@Service
public class ExpenseServiceImpl implements ExpenseService{
	
	@Autowired
	ExpenseCategoryRepo exCatRepo;
	@Autowired
	ExpenseRepo exRepo;
	@Autowired
	UserRepo userRepo;
	@Autowired
	FutureExpenseRepo fexRepo;
	
	// Aggregate Functions
	
	@Override
	public Map<String, Double> sortExpensesByCategory(String username) {
	Map<String, Double> aggCat = new HashMap<>();
	List<Expense> allExpenses = indexExpenses(username);
	for (int i = 0; i < allExpenses.size(); i++) {
		if (!aggCat.containsKey(allExpenses.get(i).getExpenseCategory().getName())) {
			aggCat.put(allExpenses.get(i).getExpenseCategory().getName(), allExpenses.get(i).getAmount());
		}
		else {
			aggCat.put(allExpenses.get(i).getExpenseCategory().getName(), 
			aggCat.get(allExpenses.get(i).getExpenseCategory().getName()) + allExpenses.get(i).getAmount());
		}
	}
	return aggCat;
	}
	
	@Override
	public TreeMap<String, Double> sortExpensesByCategoryAndDate(String username, Date inputDate, Date todayDate) {
		TreeMap<String, Double> aggCat = new TreeMap<>();
		List<Expense> allExpenses = findExpensesBetweenDates(inputDate, todayDate, username);
		for (int i = 0; i < allExpenses.size(); i++) {
			if (!aggCat.containsKey(allExpenses.get(i).getExpenseCategory().getName())) {
				aggCat.put(allExpenses.get(i).getExpenseCategory().getName(), allExpenses.get(i).getAmount());
			}
			else {
				aggCat.put(allExpenses.get(i).getExpenseCategory().getName(), 
				aggCat.get(allExpenses.get(i).getExpenseCategory().getName()) + allExpenses.get(i).getAmount());
			}
		}
		return aggCat;
	}
	
	@Override
	public List<Expense> findExpensesBetweenDates(Date start, Date end, String username) {	
		System.out.println(start);
		System.out.println(end);
		return exRepo.findByUser_UsernameAndDateBetween(start, end, username);
	}
	
	@Override
	public List<Expense> findExpensesByCategory(String username, int id) {
		return exRepo.findByUser_UsernameAndExpenseCategory_Id(username, id);
	}
	
	@Override
	public List<ExpenseCategory> indexExpenseCategory() {
		return exCatRepo.findAll();
	}
	
	// Expense CRUD
	@Override
	public List<Expense> indexExpenses(String username) {
		return exRepo.findByUser_UsernameOrderByDateDesc(username);
	}
	
	@Override
	public Expense show(String username, int id) {
		return exRepo.findByUser_UsernameAndId(username, id);
	}
	
	@Override
	public Expense create(String username, Expense expense) {
		expense.setUser(userRepo.findByUsername(username));
		expense.setExpenseCategory(exCatRepo.findById(expense.getExpenseCategory().getId()).get());
		return exRepo.saveAndFlush(expense);
	}
	
	@Override
	public Expense update(String username, int id, Expense expense) {
		Expense e = show(username, id);
		e.setAmount(expense.getAmount());
		e.setDate(expense.getDate());
		e.setDescription(expense.getDescription());
		e.setExpenseCategory(exCatRepo.findById(expense.getExpenseCategory().getId()).get());
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
	
	//Future Expenses CRUD
	
	@Override
	public List<FutureExpense> indexFutureExpenses(String username) {
		return fexRepo.findByUser_UsernameOrderByExpectedDateAsc(username);
	}
	
	@Override
	public FutureExpense showFex(String username, int id) {
		return fexRepo.findByUser_UsernameAndId(username, id);
	}
	
	@Override
	public FutureExpense createFex(String username, FutureExpense futureExpense) {
		futureExpense.setUser(userRepo.findByUsername(username));
		futureExpense.setExpenseCategory(exCatRepo.findById(futureExpense.getExpenseCategory().getId()).get());
		return fexRepo.saveAndFlush(futureExpense);
	}
	
	@Override
	public FutureExpense updateFex(String username, int id, FutureExpense futureExpense) {
		FutureExpense fex = showFex(username, id);
		fex.setAmount(futureExpense.getAmount());
		fex.setDescription(futureExpense.getDescription());
		fex.setExpectedDate(futureExpense.getExpectedDate());
		fex.setExpenseCategory(futureExpense.getExpenseCategory());
		fex.setRecurring(futureExpense.getRecurring());
		return fexRepo.saveAndFlush(fex);
	}
	
	@Override
	public boolean destroyFex(String username, int id) {
		try {
			fexRepo.delete(showFex(username, id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
