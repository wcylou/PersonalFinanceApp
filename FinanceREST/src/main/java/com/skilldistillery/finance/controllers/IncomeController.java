package com.skilldistillery.finance.controllers;

import java.security.Principal;
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
	
	
	@RequestMapping(path="income/between", method= RequestMethod.POST)
	public List<Income> incomeBetweenMonths(@RequestBody DateDTO dateDTO, Principal principal) throws ParseException  {
		String start = dateDTO.getStart();
		String end = dateDTO.getEnd();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(start);
		Date endDate = df.parse(end);
		return inServ.findIncomeBetweenDates(startDate, endDate, principal.getName());
	}
	
	@RequestMapping(path="income/categories", method= RequestMethod.GET)
	public List<IncomeCategory> indexCategories(Principal principal) {
		return inServ.indexIncomeCategory();
	}
	@RequestMapping(path="income", method= RequestMethod.GET)
	public List<Income> index(Principal principal) {
		return inServ.indexIncome(principal.getName());
	}
	
	@RequestMapping(path="income/{id}", method = RequestMethod.GET) 
	public Income getOneIncome(@PathVariable int id, Principal principal) {
		return inServ.show(principal.getName(), id);
	}
	
	@RequestMapping(path="income", method = RequestMethod.POST) 
	public Income createIncome(@RequestBody Income income, Principal principal) {
		return inServ.create(principal.getName(), income);
	}
	
	@RequestMapping(path="income/{id}", method = RequestMethod.PATCH) 
	public Income updateIncome(@RequestBody Income income, @PathVariable int id, Principal principal) {
		return inServ.update(principal.getName(), id, income);
	}
	
	@RequestMapping(path="income/{id}", method = RequestMethod.DELETE)
	public boolean deleteIncome(@PathVariable int id, Principal principal) {
		return inServ.destroy(principal.getName(), id);
	}
	@RequestMapping(path="incomeStream", method= RequestMethod.GET)
	public List<IncomeStream> indexIncomeStream(Principal principal) {
		return inServ.indexIncomeStream(principal.getName());
	}
	
	@RequestMapping(path="incomeStream/{id}", method = RequestMethod.GET) 
	public IncomeStream getOneIncomeStream(@PathVariable int id, Principal principal) {
		return inServ.showIncomeStream(principal.getName(), id);
	}
	
	@RequestMapping(path="incomeStream", method = RequestMethod.POST) 
	public IncomeStream createIncomeStream(@RequestBody IncomeStream incomeStream, Principal principal) {
		return inServ.createIncomeStream(principal.getName(), incomeStream);
	}
	
	@RequestMapping(path="incomeStream/{id}", method = RequestMethod.PATCH) 
	public IncomeStream updateIncomeStream(@RequestBody IncomeStream incomeStream, @PathVariable int id, Principal principal) {
		return inServ.updateIncomeStream(principal.getName(), id, incomeStream);
	}
	
	@RequestMapping(path="incomeStream/{id}", method = RequestMethod.DELETE)
	public boolean deleteIncomeStream(@PathVariable int id, Principal principal) {
		return inServ.destroyIncomeStream(principal.getName(), id);
	}
	
	
}
