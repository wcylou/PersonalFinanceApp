package com.skilldistillery.finance.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Table(name = "income_stream")
@Entity
public class IncomeStream {
	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Id
	private int id;
	@Column(name = "expected_amount")
	private double expectedAmount;
	@Column(name = "start_date")
	private Date startDate;
	@Column(name = "number_of_occurrences")
	private int numberOfOccurrences;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private IncomeCategory incomeCategory;
	private boolean recurring;
	
	public boolean isRecurring() {
		return recurring;
	}
	public void setRecurring(boolean recurring) {
		this.recurring = recurring;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getExpectedAmount() {
		return expectedAmount;
	}
	public void setExpectedAmount(double expectedAmount) {
		this.expectedAmount = expectedAmount;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public int getNumberOfOccurrences() {
		return numberOfOccurrences;
	}
	public void setNumberOfOccurrences(int numberOfOccurrences) {
		this.numberOfOccurrences = numberOfOccurrences;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public IncomeCategory getIncomeCategory() {
		return incomeCategory;
	}
	public void setIncomeCategory(IncomeCategory incomeCategory) {
		this.incomeCategory = incomeCategory;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(expectedAmount);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + id;
		result = prime * result + ((incomeCategory == null) ? 0 : incomeCategory.hashCode());
		result = prime * result + (recurring ? 1231 : 1237);
		result = prime * result + ((startDate == null) ? 0 : startDate.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		result = prime * result + numberOfOccurrences;
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
		IncomeStream other = (IncomeStream) obj;
		if (Double.doubleToLongBits(expectedAmount) != Double.doubleToLongBits(other.expectedAmount))
			return false;
		if (id != other.id)
			return false;
		if (incomeCategory == null) {
			if (other.incomeCategory != null)
				return false;
		} else if (!incomeCategory.equals(other.incomeCategory))
			return false;
		if (recurring != other.recurring)
			return false;
		if (startDate == null) {
			if (other.startDate != null)
				return false;
		} else if (!startDate.equals(other.startDate))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		if (numberOfOccurrences != other.numberOfOccurrences)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "IncomeStream [id=" + id + ", expectedAmount=" + expectedAmount + ", startDate=" + startDate
				+ ", numberOfOccurrences=" + numberOfOccurrences + ", user=" + user + ", incomeCategory=" + incomeCategory
				+ "]";
	}
}
