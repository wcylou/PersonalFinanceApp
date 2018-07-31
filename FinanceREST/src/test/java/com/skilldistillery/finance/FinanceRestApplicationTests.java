package com.skilldistillery.finance;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.finance.entities.Expense;
import com.skilldistillery.finance.entities.Income;
import com.skilldistillery.finance.entities.IncomeCategory;
import com.skilldistillery.finance.entities.User;
import com.skilldistillery.finance.repo.ExpenseRepo;
import com.skilldistillery.finance.repo.IncomeRepo;
import com.skilldistillery.finance.services.UserService;


@RunWith(SpringRunner.class)
@SpringBootTest
public class FinanceRestApplicationTests {

	@Autowired
	UserService userServ;
	
	@Autowired
	ExpenseRepo exRepo;
	
	@Autowired
	IncomeRepo inRepo;
	

	@Test
	public void contextLoads() {
		User user = userServ.show(1);
		assertEquals("user", user.getUsername());
		assertEquals("user", user.getPassword());
	}
	@Test
	public void testIncome() {
		List<Income> incomeList = inRepo.findAll();
		assertEquals(15, incomeList.size());
	}
	@Test
	public void indexWorks() {
		List<Expense> expenseList = exRepo.findAll();
		assertEquals(399, expenseList.size());
	}
	@Test
	public void testCategories() {
		List<Expense> expenseList = exRepo.findAll();
		assertEquals("General", expenseList.get(0).getExpenseCategory().getName());
		List<Income> incomeList = inRepo.findAll();
		assertEquals("Salary", incomeList.get(0).getIncomeCategory().getName());
	}

}
