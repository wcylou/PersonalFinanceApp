package com.skilldistillery.finance.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({"*", "http://localhost:4200"})
@RequestMapping("api/")
@RestController
public class BudgetController {

}
