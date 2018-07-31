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
import com.skilldistillery.finance.services.IncomeService;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class IncomeController {

	@Autowired
	IncomeService inServ;
	
	String username = "user";
	
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
	
	
}
