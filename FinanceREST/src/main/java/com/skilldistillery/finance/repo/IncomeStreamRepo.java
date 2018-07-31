package com.skilldistillery.finance.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.IncomeStream;

public interface IncomeStreamRepo extends JpaRepository<IncomeStream, Integer>{

}
