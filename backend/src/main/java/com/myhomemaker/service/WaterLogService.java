package com.myhomemaker.service;

import com.myhomemaker.model.WaterLog;
import com.myhomemaker.repository.WaterLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WaterLogService {

    @Autowired
    private WaterLogRepository waterLogRepository;

    public List<WaterLog> getAllWaterLogs() {
        return waterLogRepository.findAll();
    }

    public List<WaterLog> getWaterLogsByDate(LocalDate date) {
        return waterLogRepository.findByDate(date);
    }

    public Optional<WaterLog> getWaterLogById(String id) {
        return waterLogRepository.findById(id);
    }

    public WaterLog createWaterLog(WaterLog waterLog) {
        return waterLogRepository.save(waterLog);
    }

    public WaterLog updateWaterLog(String id, WaterLog waterLog) {
        if (waterLogRepository.existsById(id)) {
            waterLog.setId(id);
            return waterLogRepository.save(waterLog);
        }
        return null;
    }

    public void deleteWaterLog(String id) {
        waterLogRepository.deleteById(id);
    }
}
