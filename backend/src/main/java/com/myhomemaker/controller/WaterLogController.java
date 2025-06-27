package com.myhomemaker.controller;

import com.myhomemaker.model.WaterLog;
import com.myhomemaker.service.WaterLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/water-logs")
public class WaterLogController {

    @Autowired
    private WaterLogService waterLogService;

    @GetMapping
    public List<WaterLog> getAllWaterLogs() {
        return waterLogService.getAllWaterLogs();
    }

    @GetMapping("/date/{date}")
    public List<WaterLog> getWaterLogsByDate(@PathVariable LocalDate date) {
        return waterLogService.getWaterLogsByDate(date);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WaterLog> getWaterLogById(@PathVariable String id) {
        Optional<WaterLog> waterLog = waterLogService.getWaterLogById(id);
        return waterLog.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WaterLog> createWaterLog(@Valid @RequestBody WaterLog waterLog) {
        WaterLog createdWaterLog = waterLogService.createWaterLog(waterLog);
        return ResponseEntity.ok(createdWaterLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WaterLog> updateWaterLog(@PathVariable String id, @Valid @RequestBody WaterLog waterLog) {
        WaterLog updatedWaterLog = waterLogService.updateWaterLog(id, waterLog);
        return updatedWaterLog != null ? ResponseEntity.ok(updatedWaterLog)
                                       : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWaterLog(@PathVariable String id) {
        waterLogService.deleteWaterLog(id);
        return ResponseEntity.ok().build();
    }
}
