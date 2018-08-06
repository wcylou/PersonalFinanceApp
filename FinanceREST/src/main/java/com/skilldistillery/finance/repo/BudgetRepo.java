package com.skilldistillery.finance.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.finance.entities.Budget;
import com.skilldistillery.finance.entities.Expense;

public interface BudgetRepo extends JpaRepository<Budget, Integer>{
	
		List<Budget> findByUser_UsernameOrderByStartDateDesc(String username);
		Budget findByUser_UsernameAndId(String username, int id);
		List<Budget> findByUser_UsernameAndExpenseCategory_Id(String username, int id);
		List<Budget> findByUser_UsernameAndStartDateLessThanEqualAndEndDateGreaterThanEqual(String username,
				Date startDate, Date endDate);
}
