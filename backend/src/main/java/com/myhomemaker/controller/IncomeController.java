package com.myhomemaker.controller;

import com.myhomemaker.model.Income;
import com.myhomemaker.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public List<Income> getAllIncomes() {
        return incomeService.getAllIncomes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Income> getIncomeById(@PathVariable String id) {
        Optional<Income> income = incomeService.getIncomeById(id);
        return income.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Income> createIncome(@Valid @RequestBody Income income) {
        Income createdIncome = incomeService.createIncome(income);
        return ResponseEntity.ok(createdIncome);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(@PathVariable String id, @Valid @RequestBody Income income) {
        Income updatedIncome = incomeService.updateIncome(id, income);
        return updatedIncome != null ? ResponseEntity.ok(updatedIncome)
                                     : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable String id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.ok().build();
    }
}
