package com.myhomemaker.repository;

import com.myhomemaker.model.ProteinLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProteinLogRepository extends MongoRepository<ProteinLog, String> {
    List<ProteinLog> findByDate(LocalDate date);
}
