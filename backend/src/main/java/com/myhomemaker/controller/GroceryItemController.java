package com.myhomemaker.controller;

import com.myhomemaker.model.GroceryItem;
import com.myhomemaker.service.GroceryItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groceries")
public class GroceryItemController {

    @Autowired
    private GroceryItemService groceryItemService;

    @GetMapping
    public List<GroceryItem> getAllGroceryItems() {
        return groceryItemService.getAllGroceryItems();
    }

    @GetMapping("/inventory")
    public List<GroceryItem> getInventoryItems() {
        return groceryItemService.getInventoryItems();
    }

    @GetMapping("/shopping-list")
    public List<GroceryItem> getShoppingListItems() {
        return groceryItemService.getShoppingListItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroceryItem> getGroceryItemById(@PathVariable String id) {
        Optional<GroceryItem> groceryItem = groceryItemService.getGroceryItemById(id);
        return groceryItem.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GroceryItem> createGroceryItem(@Valid @RequestBody GroceryItem groceryItem) {
        GroceryItem createdGroceryItem = groceryItemService.createGroceryItem(groceryItem);
        return ResponseEntity.ok(createdGroceryItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroceryItem> updateGroceryItem(@PathVariable String id, @Valid @RequestBody GroceryItem groceryItem) {
        GroceryItem updatedGroceryItem = groceryItemService.updateGroceryItem(id, groceryItem);
        return updatedGroceryItem != null ? ResponseEntity.ok(updatedGroceryItem)
                                          : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroceryItem(@PathVariable String id) {
        groceryItemService.deleteGroceryItem(id);
        return ResponseEntity.ok().build();
    }
}
