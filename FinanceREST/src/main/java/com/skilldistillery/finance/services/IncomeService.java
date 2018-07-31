package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Income;
import com.skilldistillery.finance.entities.IncomeCategory;
import com.skilldistillery.finance.entities.IncomeStream;

public interface IncomeService {

	List<Income> indexIncome(String username);

	Income show(String username, int id);

	Income create(String username, Income income);

	Income update(String username, int id, Income income);

	boolean destroy(String username, int id);

	IncomeStream updateIncomeStream(String username, int id, IncomeStream incomeStream);

	boolean destroyIncomeStream(String username, int id);

	IncomeStream createIncomeStream(String username, IncomeStream incomeStream);

	IncomeStream showIncomeStream(String username, int id);

	List<IncomeStream> indexIncomeStream(String username);

	List<IncomeCategory> indexIncomeCategory();

}
