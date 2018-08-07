package com.skilldistillery.finance.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Expense;
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
	public Map<String, Double> sortIncomeByCategoryAndDate(String username, Date inputDate, Date todayDate) {
		Map<String, Double> aggCat = new HashMap<>();
		List<Income> allIncome = findIncomeBetweenDates(inputDate, todayDate, username);
		for (int i = 0; i < allIncome.size(); i++) {
			if (!aggCat.containsKey(allIncome.get(i).getIncomeCategory().getName())) {
				aggCat.put(allIncome.get(i).getIncomeCategory().getName(), allIncome.get(i).getAmount());
			}
			else {
				aggCat.put(allIncome.get(i).getIncomeCategory().getName(), 
				aggCat.get(allIncome.get(i).getIncomeCategory().getName()) + allIncome.get(i).getAmount());
			}
		}
		return aggCat;
	}
	
	
	@Override
	public List<Income> findIncomeBetweenDates(Date start, Date end, String username) {	
		return inRepo.findByUser_UsernameAndDateReceivedBetween(start, end, username);
	}
	
	@Override
	public List<IncomeCategory> indexIncomeCategory() {
		return inCatRepo.findAll();
	}
	@Override
	public List<Income> indexIncome(String username) {
		return inRepo.findByUser_UsernameOrderByDateReceivedDesc(username);
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
		return inStreamRepo.findByUser_UsernameOrderByStartDateAsc(username);
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
		e.setNumberOfOccurrences(incomeStream.getNumberOfOccurrences());
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
