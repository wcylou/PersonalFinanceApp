package com.skilldistillery.finance.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.finance.entities.Expense;

public interface ExpenseRepo extends JpaRepository<Expense, Integer>{
	
	@Query("Select e from Expense e where (e.date between :start and :end) AND e.user.username = :username")
	List<Expense> findByUser_UsernameAndDateBetween(@Param("start") Date start,@Param("end") Date end, @Param("username") String username);
	
	Expense findByUser_UsernameAndId(String username, int id);
	List<Expense> findByUser_UsernameOrderByDateDesc(String username);
	List<Expense> findByUser_UsernameAndExpenseCategory_Id(String username, int id);

}
