package com.skilldistillery.finance.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.finance.entities.Income;

public interface IncomeRepo extends JpaRepository<Income, Integer> {
	
	@Query("Select i from Income i where (i.dateReceived between :start and :end) AND i.user.username = :username")
	List<Income> findByUser_UsernameAndDateReceivedBetween(@Param("start") Date start,@Param("end") Date end, @Param("username") String username);
	Income findByUser_UsernameAndId(String username, int id);
	List<Income> findByUser_UsernameOrderByDateReceivedDesc(String username);
	
}
