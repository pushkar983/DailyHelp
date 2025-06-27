package com.myhomemaker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotBlank;

@Document(collection = "groceries")
public class GroceryItem {

    @Id
    private String id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    private String quantity;
    private boolean inInventory;
    private boolean purchased;

    // Constructors
    public GroceryItem() {
    }

    public GroceryItem(String name, String quantity, boolean inInventory, boolean purchased) {
        this.name = name;
        this.quantity = quantity;
        this.inInventory = inInventory;
        this.purchased = purchased;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public boolean isInInventory() {
        return inInventory;
    }

    public void setInInventory(boolean inInventory) {
        this.inInventory = inInventory;
    }

    public boolean isPurchased() {
        return purchased;
    }

    public void setPurchased(boolean purchased) {
        this.purchased = purchased;
    }
}
