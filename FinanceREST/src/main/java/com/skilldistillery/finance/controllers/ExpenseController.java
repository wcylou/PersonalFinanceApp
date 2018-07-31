package com.skilldistillery.finance.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	@RequestMapping(path="expense", method= RequestMethod.POST)
	public List<Expense> index() {
		return exServ.indexExpenses(username);
	}
	
}
