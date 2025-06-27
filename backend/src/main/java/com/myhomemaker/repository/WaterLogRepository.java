package com.myhomemaker.repository;

import com.myhomemaker.model.WaterLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface WaterLogRepository extends MongoRepository<WaterLog, String> {
    List<WaterLog> findByDate(LocalDate date);
}
