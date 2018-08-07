package com.skilldistillery.finance.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.services.CurrencyService;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class CurrencyController {
	
	@Autowired
	CurrencyService cServe;
	
	@RequestMapping(path="currencies", method= RequestMethod.GET)
	public Map<String, Double> getCurrencies() {
		return cServe.getCurrencies();
	}

}
