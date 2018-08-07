package com.skilldistillery.finance.controllers;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

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
	
	
	@RequestMapping(path="expenses/between", method= RequestMethod.POST)
	public List<Expense> expensesBetweenMonths(@RequestBody DateDTO dateDTO, Principal principal) throws ParseException {
		String start = dateDTO.getStart();
		String end = dateDTO.getEnd();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(start);
		Date endDate = df.parse(end);
		
		
		System.out.println(startDate);
		System.out.println(endDate);
		return exServ.findExpensesBetweenDates(startDate, endDate, principal.getName());
	}
	
	@RequestMapping(path="expenses/categories/{id}", method = RequestMethod.GET)
	public List<Expense> expensesByCategory(@PathVariable int id, Principal principal) {
		System.out.println(id);
		return exServ.findExpensesByCategory(principal.getName(), id);
	}
	
	@RequestMapping(path="expenses/categories", method= RequestMethod.GET)
	public List<ExpenseCategory> indexExpenseCategories(Principal principal) {
		return exServ.indexExpenseCategory();
	}
	
	//Expense CRUD Routes
	
	@RequestMapping(path="expenses", method= RequestMethod.GET)
	public List<Expense> index(Principal principal) {
		return exServ.indexExpenses(principal.getName());
	}
	
	@RequestMapping(path="expenses/{id}", method = RequestMethod.GET) 
	public Expense getOneExpense(@PathVariable int id, Principal principal) {
		return exServ.show(principal.getName(), id);
	}
	
	@RequestMapping(path="expenses", method = RequestMethod.POST) 
	public Expense createExpense(@RequestBody Expense expense, Principal principal) {
		System.out.println("+++++++ controller print out create");
		System.out.println(expense);
		System.out.println(expense.getExpenseCategory());
		System.out.println(expense.getExpenseCategory().getId());
		return exServ.create(principal.getName(), expense);
	}
	
	@RequestMapping(path="expenses/{id}", method = RequestMethod.PATCH) 
	public Expense updateExpense(@RequestBody Expense expense, @PathVariable int id, Principal principal) {
		return exServ.update(principal.getName(), id, expense);
	}
	
	@RequestMapping(path="expenses/{id}", method = RequestMethod.DELETE)
	public boolean deleteExpense(@PathVariable int id, Principal principal) {
		return exServ.destroy(principal.getName(), id);
	}
	
	// Future Expense CRUD Routes
	
	@RequestMapping(path="futureExpense", method= RequestMethod.GET)
	public List<FutureExpense> indexFutureExpenses(Principal principal) {
		return exServ.indexFutureExpenses(principal.getName());
	}
	
	@RequestMapping(path="futureExpense/{id}", method = RequestMethod.GET) 
	public FutureExpense getOneFutureExpense(@PathVariable int id, Principal principal) {
		return exServ.showFex(principal.getName(), id);
	}
	
	@RequestMapping(path="futureExpense", method = RequestMethod.POST) 
	public FutureExpense createExpense(@RequestBody FutureExpense futureExpense, Principal principal) {
		return exServ.createFex(principal.getName(), futureExpense);
	}
	
	@RequestMapping(path="futureExpense/{id}", method = RequestMethod.PATCH) 
	public FutureExpense updateFutureExpense(@RequestBody FutureExpense futureExpense, @PathVariable int id, Principal principal) {
		return exServ.updateFex(principal.getName(), id, futureExpense);	
	}
	
	@RequestMapping(path="futureExpense/{id}", method = RequestMethod.DELETE)
	public boolean deleteFutureExpense(@PathVariable int id, Principal principal) {
		return exServ.destroyFex(principal.getName(), id);
	}
	
	@RequestMapping(path="expenses/piechart", method = RequestMethod.GET)
	public Map<String, Double> sortExpensesByCategory(Principal principal) {
		return exServ.sortExpensesByCategory(principal.getName());
	}
	
	@RequestMapping(path="expenses/piechart", method = RequestMethod.POST)
	public Map<String, Double> sortExpensesByCategoryAndDate(@RequestBody DateDTO dateDTO, Principal principal) throws ParseException {
		String start = dateDTO.getStart();
		String end = dateDTO.getEnd();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(start);
		Date endDate = df.parse(end);
		return exServ.sortExpensesByCategoryAndDate(principal.getName(), startDate, endDate);
	}
}
