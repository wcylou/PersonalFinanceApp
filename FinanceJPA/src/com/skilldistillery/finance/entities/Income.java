package com.skilldistillery.finance.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Income {

	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Id
	private int id;
	private double amount;
	@Column(name ="date_received")
	private Date dateReceived;
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name="category_id")
	private IncomeCategory incomeCategory;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public Date getDateReceived() {
		return dateReceived;
	}
	public void setDateReceived(Date dateReceived) {
		this.dateReceived = dateReceived;
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
		temp = Double.doubleToLongBits(amount);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((dateReceived == null) ? 0 : dateReceived.hashCode());
		result = prime * result + id;
		result = prime * result + ((incomeCategory == null) ? 0 : incomeCategory.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		Income other = (Income) obj;
		if (Double.doubleToLongBits(amount) != Double.doubleToLongBits(other.amount))
			return false;
		if (dateReceived == null) {
			if (other.dateReceived != null)
				return false;
		} else if (!dateReceived.equals(other.dateReceived))
			return false;
		if (id != other.id)
			return false;
		if (incomeCategory == null) {
			if (other.incomeCategory != null)
				return false;
		} else if (!incomeCategory.equals(other.incomeCategory))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Income [id=" + id + ", amount=" + amount + ", dateReceived=" + dateReceived + ", user=" + user
				+ ", incomeCategory=" + incomeCategory + "]";
	}
	
}
