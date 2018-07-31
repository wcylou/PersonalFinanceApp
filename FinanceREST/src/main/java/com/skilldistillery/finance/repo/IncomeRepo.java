package com.skilldistillery.finance.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Income;

public interface IncomeRepo extends JpaRepository<Income, Integer>{

}
