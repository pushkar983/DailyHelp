package com.myhomemaker.controller;

import com.myhomemaker.model.ProteinLog;
import com.myhomemaker.service.ProteinLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/protein-logs")
public class ProteinLogController {

    @Autowired
    private ProteinLogService proteinLogService;

    @GetMapping
    public List<ProteinLog> getAllProteinLogs() {
        return proteinLogService.getAllProteinLogs();
    }

    @GetMapping("/date/{date}")
    public List<ProteinLog> getProteinLogsByDate(@PathVariable LocalDate date) {
        return proteinLogService.getProteinLogsByDate(date);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProteinLog> getProteinLogById(@PathVariable String id) {
        Optional<ProteinLog> proteinLog = proteinLogService.getProteinLogById(id);
        return proteinLog.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProteinLog> createProteinLog(@Valid @RequestBody ProteinLog proteinLog) {
        ProteinLog createdProteinLog = proteinLogService.createProteinLog(proteinLog);
        return ResponseEntity.ok(createdProteinLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProteinLog> updateProteinLog(@PathVariable String id, @Valid @RequestBody ProteinLog proteinLog) {
        ProteinLog updatedProteinLog = proteinLogService.updateProteinLog(id, proteinLog);
        return updatedProteinLog != null ? ResponseEntity.ok(updatedProteinLog)
                                         : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProteinLog(@PathVariable String id) {
        proteinLogService.deleteProteinLog(id);
        return ResponseEntity.ok().build();
    }
}
