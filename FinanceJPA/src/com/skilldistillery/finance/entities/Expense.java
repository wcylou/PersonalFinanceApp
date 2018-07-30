package com.skilldistillery.finance.entities;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Expense {
	// alex test
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;

}
