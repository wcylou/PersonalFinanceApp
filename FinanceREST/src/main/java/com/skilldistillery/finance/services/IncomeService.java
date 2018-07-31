package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Income;

public interface IncomeService {

	List<Income> indexIncome(String username);

	Income show(String username, int id);

	Income create(String username, Income income);

	Income update(String username, int id, Income income);

	boolean destroy(String username, int id);

}
