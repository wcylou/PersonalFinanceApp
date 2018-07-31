package com.skilldistillery.finance.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.DateDTO;
import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.entities.ExpenseCategory;
import com.skilldistillery.finance.entities.FutureExpense;
import com.skilldistillery.finance.services.ExpenseService;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class ExpenseController {

	@Autowired
	ExpenseService exServ;
	
	String username = "user";
	
	@RequestMapping(path="expenses/between", method= RequestMethod.POST)
	public List<Expense> expensesBetweenMonths(@RequestBody DateDTO dateDTO) throws ParseException {
		String start = dateDTO.getStart();
		String end = dateDTO.getEnd();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(start);
		Date endDate = df.parse(end);
		
		
		System.out.println(startDate);
		System.out.println(endDate);
		return exServ.findExpensesBetweenDates(startDate, endDate, username);
	}
	
	@RequestMapping(path="expenses/categories/{id}", method = RequestMethod.GET)
	public List<Expense> expensesByCategory(@PathVariable int id) {
		System.out.println(id);
		return exServ.findExpensesByCategory(username, id);
	}
	
	@RequestMapping(path="expenses/categories", method= RequestMethod.GET)
	public List<ExpenseCategory> indexExpenseCategories() {
		return exServ.indexExpenseCategory();
	}
	
	//Expense CRUD Routes
	
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
	
	@RequestMapping(path="expenses/{id}", method = RequestMethod.DELETE)
	public boolean deleteExpense(@PathVariable int id) {
		return exServ.destroy(username, id);
	}
	
	// Future Expense CRUD Routes
	
	@RequestMapping(path="futureExpense", method= RequestMethod.GET)
	public List<FutureExpense> indexFutureExpenses() {
		return exServ.indexFutureExpenses(username);
	}
	
	@RequestMapping(path="futureExpense/{id}", method = RequestMethod.GET) 
	public FutureExpense getOneFutureExpense(@PathVariable int id) {
		return exServ.showFex(username, id);
	}
	
	@RequestMapping(path="futureExpense", method = RequestMethod.POST) 
	public FutureExpense createExpense(@RequestBody FutureExpense futureExpense) {
		return exServ.createFex(username, futureExpense);
	}
	
	@RequestMapping(path="futureExpense/{id}", method = RequestMethod.PATCH) 
	public FutureExpense updateFutureExpense(@RequestBody FutureExpense futureExpense, @PathVariable int id) {
		return exServ.updateFex(username, id, futureExpense);
	}
	
	@RequestMapping(path="futureExpense/{id}", method = RequestMethod.DELETE)
	public boolean deleteFutureExpense(@PathVariable int id) {
		return exServ.destroyFex(username, id);
	}
}
