package com.myhomemaker.repository;

import com.myhomemaker.model.GroceryItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GroceryItemRepository extends MongoRepository<GroceryItem, String> {
    List<GroceryItem> findByInInventoryTrue();
    List<GroceryItem> findByInInventoryFalse();
}
