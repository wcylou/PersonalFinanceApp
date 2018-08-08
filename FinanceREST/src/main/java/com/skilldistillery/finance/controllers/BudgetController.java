package com.skilldistillery.finance.controllers;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.Budget;
import com.skilldistillery.finance.entities.DateDTO;
import com.skilldistillery.finance.services.BudgetService;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class BudgetController {

	@Autowired
	BudgetService budServ;
	
	String username = "user";
	
	@RequestMapping(path="budget/between", method= RequestMethod.POST)
	public TreeMap<String, Double> budgetBetweenMonths(@RequestBody DateDTO dateDTO, Principal principal) throws ParseException  {
		String start = dateDTO.getStart();
		String end = dateDTO.getEnd();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(start);
		Date endDate = df.parse(end);
		return budServ.sortBudgetsByCategoryAndDate(username, startDate, endDate);
	}


	
	@RequestMapping(path="budget/categories/{id}", method = RequestMethod.GET)
	public List<Budget> expensesByCategory(@PathVariable int id, Principal principal) {
		System.out.println(id);
		return budServ.findBudgetByCategory(principal.getName(), id);
	}
	
	@RequestMapping(path="budget", method= RequestMethod.GET)
	public List<Budget> index(Principal principal) {
		return budServ.indexBudget(principal.getName());
	}
	
	@RequestMapping(path="budget/{id}", method = RequestMethod.GET) 
	public Budget getOneExpense(@PathVariable int id, Principal principal) {
		return budServ.show(principal.getName(), id);
	}
	
	@RequestMapping(path="budget", method = RequestMethod.POST) 
	public Budget createExpense(@RequestBody Budget budget, Principal principal) {
		return budServ.create(principal.getName(), budget);
	}
	
	@RequestMapping(path="budget/{id}", method = RequestMethod.PATCH) 
	public Budget updateExpense(@RequestBody Budget budget, @PathVariable int id, Principal principal) {
		return budServ.update(principal.getName(), id, budget);
	}
	
	@RequestMapping(path="budget/{id}", method = RequestMethod.DELETE)
	public boolean deleteExpense(@PathVariable int id, Principal principal) {
		return budServ.destroy(principal.getName(), id);
	}
}
