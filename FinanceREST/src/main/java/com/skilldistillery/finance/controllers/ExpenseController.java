package com.skilldistillery.finance.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.services.ExpenseService;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class ExpenseController {

	@Autowired
	ExpenseService exServ;
	
	String username = "user";
	
	@RequestMapping(path="expenses", method= RequestMethod.GET)
	public List<Expense> index() {
		return exServ.indexExpenses(username);
	}
	
	@RequestMapping(path="expenses/{id}", method = RequestMethod.GET) 
	public Expense getOneExpense(@PathVariable int id) {
		return exServ.show(username, id);
	}
	
	@RequestMapping(path="expenses", method = RequestMethod.POST) 
	public Expense createExpense(@RequestBody Expense expense) {
		return exServ.create(username, expense);
	}
	
	@RequestMapping(path="expenses/{id}", method = RequestMethod.PATCH) 
	public Expense updateExpense(@RequestBody Expense expense, @PathVariable int id) {
		return exServ.update(username, id, expense);
	}
	
	@RequestMapping(path="expenses", method = RequestMethod.DELETE)
	public boolean deleteExpense(@PathVariable int id) {
		return exServ.destroy(username, id);
	}
}
