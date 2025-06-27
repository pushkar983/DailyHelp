package com.myhomemaker.service;

import com.myhomemaker.model.Income;
import com.myhomemaker.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    public List<Income> getAllIncomes() {
        return incomeRepository.findAll();
    }

    public Optional<Income> getIncomeById(String id) {
        return incomeRepository.findById(id);
    }

    public Income createIncome(Income income) {
        return incomeRepository.save(income);
    }

    public Income updateIncome(String id, Income income) {
        if (incomeRepository.existsById(id)) {
            income.setId(id);
            return incomeRepository.save(income);
        }
        return null;
    }

    public void deleteIncome(String id) {
        incomeRepository.deleteById(id);
    }
}
