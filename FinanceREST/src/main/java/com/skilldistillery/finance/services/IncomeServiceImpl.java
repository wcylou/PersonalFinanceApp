package com.skilldistillery.finance.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Income;
import com.skilldistillery.finance.entities.IncomeCategory;
import com.skilldistillery.finance.entities.IncomeStream;
import com.skilldistillery.finance.repo.IncomeCategoryRepo;
import com.skilldistillery.finance.repo.IncomeRepo;
import com.skilldistillery.finance.repo.IncomeStreamRepo;
import com.skilldistillery.finance.repo.UserRepo;

@Service
public class IncomeServiceImpl implements IncomeService{

	@Autowired
	IncomeRepo inRepo;
	@Autowired
	IncomeCategoryRepo inCatRepo;
	@Autowired
	IncomeStreamRepo inStreamRepo;
	@Autowired
	UserRepo userRepo;
	
	@Override
	public List<IncomeCategory> indexIncomeCategory() {
		return inCatRepo.findAll();
	}
	@Override
	public List<Income> indexIncome(String username) {
		return inRepo.findByUser_Username(username);
	}
	
	@Override
	public Income show(String username, int id) {
		return inRepo.findByUser_UsernameAndId(username, id);
	}
	
	@Override
	public Income create(String username, Income income) {
		income.setUser(userRepo.findByUsername(username));
		return inRepo.saveAndFlush(income);
	}
	
	@Override
	public Income update(String username, int id, Income income) {
		Income e = show(username, id);
		e.setAmount(income.getAmount());
		e.setDateReceived(income.getDateReceived());
		e.setIncomeCategory(income.getIncomeCategory());
		return inRepo.saveAndFlush(e);
	}
	
	@Override
	public boolean destroy(String username, int id) {
		try {
			inRepo.delete(show(username, id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	@Override
	public List<IncomeStream> indexIncomeStream(String username) {
		return inStreamRepo.findByUser_Username(username);
	}
	
	@Override
	public IncomeStream showIncomeStream(String username, int id) {
		return inStreamRepo.findByUser_UsernameAndId(username, id);
	}
	
	@Override
	public IncomeStream createIncomeStream(String username, IncomeStream incomeStream) {
		incomeStream.setUser(userRepo.findByUsername(username));
		return inStreamRepo.saveAndFlush(incomeStream);
	}
	
	@Override
	public IncomeStream updateIncomeStream(String username, int id, IncomeStream incomeStream) {
		IncomeStream e = showIncomeStream(username, id);
		e.setExpectedAmount(incomeStream.getExpectedAmount());
		e.setStartDate(incomeStream.getStartDate());
		e.setIncomeCategory(incomeStream.getIncomeCategory());
		e.setYearlyOccurrences(incomeStream.getYearlyOccurrences());
		return inStreamRepo.saveAndFlush(e);
	}
	
	@Override
	public boolean destroyIncomeStream(String username, int id) {
		try {
			inStreamRepo.delete(showIncomeStream(username, id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
}
