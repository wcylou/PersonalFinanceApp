package com.skilldistillery.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.skilldistillery.finance.services.CurrencyServiceImpl;

@SpringBootApplication
public class FinanceRestApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(FinanceRestApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(FinanceRestApplication.class, args);
		CurrencyServiceImpl simp = new CurrencyServiceImpl();
		simp.getCurrencies();
	}
}
