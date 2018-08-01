package com.skilldistillery.finance.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.Income;
import com.skilldistillery.finance.entities.IncomeCategory;
import com.skilldistillery.finance.entities.IncomeStream;
import com.skilldistillery.finance.services.IncomeService;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class IncomeController {

	@Autowired
	IncomeService inServ;
	
	String username = "user";
	
	@RequestMapping(path="income/categories", method= RequestMethod.GET)
	public List<IncomeCategory> indexCategories() {
		return inServ.indexIncomeCategory();
	}
	@RequestMapping(path="income", method= RequestMethod.GET)
	public List<Income> index() {
		return inServ.indexIncome(username);
	}
	
	@RequestMapping(path="income/{id}", method = RequestMethod.GET) 
	public Income getOneIncome(@PathVariable int id) {
		return inServ.show(username, id);
	}
	
	@RequestMapping(path="income", method = RequestMethod.POST) 
	public Income createIncome(@RequestBody Income income) {
		return inServ.create(username, income);
	}
	
	@RequestMapping(path="income/{id}", method = RequestMethod.PATCH) 
	public Income updateIncome(@RequestBody Income income, @PathVariable int id) {
		return inServ.update(username, id, income);
	}
	
	@RequestMapping(path="income/{id}", method = RequestMethod.DELETE)
	public boolean deleteIncome(@PathVariable int id) {
		return inServ.destroy(username, id);
	}
	@RequestMapping(path="incomeStream", method= RequestMethod.GET)
	public List<IncomeStream> indexIncomeStream() {
		return inServ.indexIncomeStream(username);
	}
	
	@RequestMapping(path="incomeStream/{id}", method = RequestMethod.GET) 
	public IncomeStream getOneIncomeStream(@PathVariable int id) {
		return inServ.showIncomeStream(username, id);
	}
	
	@RequestMapping(path="incomeStream", method = RequestMethod.POST) 
	public IncomeStream createIncomeStream(@RequestBody IncomeStream incomeStream) {
		return inServ.createIncomeStream(username, incomeStream);
	}
	
	@RequestMapping(path="incomeStream/{id}", method = RequestMethod.PATCH) 
	public IncomeStream updateIncomeStream(@RequestBody IncomeStream incomeStream, @PathVariable int id) {
		return inServ.updateIncomeStream(username, id, incomeStream);
	}
	
	@RequestMapping(path="incomeStream/{id}", method = RequestMethod.DELETE)
	public boolean deleteIncomeStream(@PathVariable int id) {
		return inServ.destroyIncomeStream(username, id);
	}
	
	
}
