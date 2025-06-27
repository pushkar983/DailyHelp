package com.myhomemaker.service;

import com.myhomemaker.model.ProteinLog;
import com.myhomemaker.repository.ProteinLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProteinLogService {

    @Autowired
    private ProteinLogRepository proteinLogRepository;

    public List<ProteinLog> getAllProteinLogs() {
        return proteinLogRepository.findAll();
    }

    public List<ProteinLog> getProteinLogsByDate(LocalDate date) {
        return proteinLogRepository.findByDate(date);
    }

    public Optional<ProteinLog> getProteinLogById(String id) {
        return proteinLogRepository.findById(id);
    }

    public ProteinLog createProteinLog(ProteinLog proteinLog) {
        return proteinLogRepository.save(proteinLog);
    }

    public ProteinLog updateProteinLog(String id, ProteinLog proteinLog) {
        if (proteinLogRepository.existsById(id)) {
            proteinLog.setId(id);
            return proteinLogRepository.save(proteinLog);
        }
        return null;
    }

    public void deleteProteinLog(String id) {
        proteinLogRepository.deleteById(id);
    }
}
