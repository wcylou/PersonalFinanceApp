package com.skilldistillery.finance.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Income;

public interface IncomeRepo extends JpaRepository<Income, Integer>{
				Income findByUser_UsernameAndId(String username, int id);
				List<Income> findByUser_Username(String username);
}
