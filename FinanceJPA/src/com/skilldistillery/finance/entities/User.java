package com.skilldistillery.finance.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
	private String email;
	@OneToMany(mappedBy ="user")
	private List<Budget> budgets;
	@OneToMany(mappedBy ="user")
	private List<Expense> expenses;
	@OneToMany(mappedBy ="user")
	private List<Income> incomes;
	@OneToMany(mappedBy ="user")
	private List<IncomeStream> incomeStreams;
	@OneToMany(mappedBy ="user")
	private List<FutureExpense> futureExpenses;
	
	public void addBudget(Budget budget) {
		if (budgets == null)
			budgets = new ArrayList<>();
		
		if (!budgets.contains(budget)) {
			budgets.add(budget);
			budget.setUser(this);
		}
	}
	public void removeBudget(Budget budget) {
		if(budgets != null) {
			budgets.remove(budget);
		}
	}
	
	public void removeExpense(Expense expense) {
		if(expenses != null) {
			expenses.remove(expense);
		}
	}
	public void addExpense(Expense expense) {
		if (expenses == null)
			expenses = new ArrayList<>();
		
		if (!expenses.contains(expense)) {
			expenses.add(expense);
			expense.setUser(this);
		}
	}
	public void removeIncome(Income income) {
		if(incomes != null) {
			incomes.remove(income);
		}
	}
	public void addIncome(Income income) {
		if (incomes == null)
			incomes = new ArrayList<>();
		
		if (!incomes.contains(income)) {
			incomes.add(income);
			income.setUser(this);
		}
	}
	public void removeIncomeStream(IncomeStream incomeStream) {
		if(incomeStreams != null) {
			incomeStreams.remove(incomeStream);
		}
	}
	public void addIncomeStream(IncomeStream incomeStream) {
		if (incomeStreams == null)
			incomeStreams = new ArrayList<>();
		
		if (!incomeStreams.contains(incomeStream)) {
			incomeStreams.add(incomeStream);
			incomeStream.setUser(this);
		}
	}
	public void removeFutureExpenses(FutureExpense futureExpense) {
		if(futureExpenses != null) {
			futureExpenses.remove(futureExpense);
		}
	}
	public void addFutureExpenses(FutureExpense futureExpense) {
		if (futureExpenses == null)
			futureExpenses = new ArrayList<>();
		
		if (!futureExpenses.contains(futureExpense)) {
			futureExpenses.add(futureExpense);
			futureExpense.setUser(this);
		}
	}
	
	
	
	public List<Budget> getBudgets() {
		return budgets;
	}
	public void setBudgets(List<Budget> budgets) {
		this.budgets = budgets;
	}
	public List<Expense> getExpenses() {
		return expenses;
	}
	public void setExpenses(List<Expense> expenses) {
		this.expenses = expenses;
	}
	public List<Income> getIncomes() {
		return incomes;
	}
	public void setIncomes(List<Income> incomes) {
		this.incomes = incomes;
	}
	public List<IncomeStream> getIncomeStreams() {
		return incomeStreams;
	}
	public void setIncomeStreams(List<IncomeStream> incomeStreams) {
		this.incomeStreams = incomeStreams;
	}
	public List<FutureExpense> getFutureExpenses() {
		return futureExpenses;
	}
	public void setFutureExpenses(List<FutureExpense> futureExpenses) {
		this.futureExpenses = futureExpenses;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + id;
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id != other.id)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email + "]";
	}
	
	
}
