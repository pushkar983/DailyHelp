package com.myhomemaker.service;

import com.myhomemaker.model.GroceryItem;
import com.myhomemaker.repository.GroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroceryItemService {

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    public List<GroceryItem> getAllGroceryItems() {
        return groceryItemRepository.findAll();
    }

    public List<GroceryItem> getInventoryItems() {
        return groceryItemRepository.findByInInventoryTrue();
    }

    public List<GroceryItem> getShoppingListItems() {
        return groceryItemRepository.findByInInventoryFalse();
    }

    public Optional<GroceryItem> getGroceryItemById(String id) {
        return groceryItemRepository.findById(id);
    }

    public GroceryItem createGroceryItem(GroceryItem groceryItem) {
        return groceryItemRepository.save(groceryItem);
    }

    public GroceryItem updateGroceryItem(String id, GroceryItem groceryItem) {
        if (groceryItemRepository.existsById(id)) {
            groceryItem.setId(id);
            return groceryItemRepository.save(groceryItem);
        }
        return null;
    }

    public void deleteGroceryItem(String id) {
        groceryItemRepository.deleteById(id);
    }
}
