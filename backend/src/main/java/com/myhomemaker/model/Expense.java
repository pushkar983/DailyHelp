package com.myhomemaker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;

@Document(collection = "expenses")
public class Expense {

    @Id
    private String id;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotNull(message = "Amount is mandatory")
    @Positive(message = "Amount must be positive")
    private Double amount;

    private LocalDate date;

    public Expense() {
        // default constructor
    }

    public Expense(String id, String description, Double amount, LocalDate date) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
    }

    // Getters and Setters

    @Id
    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @NotNull(message = "Amount is mandatory")
    @Positive(message = "Amount must be positive")
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate newDate) {
        this.date = newDate;   // This seems redundant and incorrect for a setter
    }
}