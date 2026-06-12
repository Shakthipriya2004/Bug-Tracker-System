package com.bugtracker.controller;
import com.bugtracker.model.Bug;
import com.bugtracker.model.BugHistory;
import com.bugtracker.service.BugService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bugs")
@CrossOrigin(origins = "*")
public class BugController {

    private final BugService bugService;

    public BugController(BugService bugService) {
        this.bugService = bugService;
    }

    @GetMapping
    public List<Bug> getBugs(@RequestParam(required = false) Bug.Status status) {
        if (status == null) {
            return bugService.getAllBugs();
        }
        return bugService.getBugsByStatus(status);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bug> getBugById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bugService.getBugById(id));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<BugHistory>> getBugHistory(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bugService.getBugHistory(id));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Bug> createBug(@RequestBody Bug bug) {
        return ResponseEntity.ok(bugService.createBug(bug));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bug> updateBug(@PathVariable Long id, @RequestBody Bug bug) {
        try {
            return ResponseEntity.ok(bugService.updateBug(id, bug));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBug(@PathVariable Long id) {
        try {
            bugService.deleteBug(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }
}
