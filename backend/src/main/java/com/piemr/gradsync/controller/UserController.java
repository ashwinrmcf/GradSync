package com.piemr.gradsync.controller;

import com.piemr.gradsync.dto.user.UserResponse;
import com.piemr.gradsync.entity.User;
import com.piemr.gradsync.repository.UserRepository;
import com.piemr.gradsync.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class UserController {
    
    private final UserRepository userRepository;
    
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsServiceImpl.CustomUserPrincipal userPrincipal = 
                (UserDetailsServiceImpl.CustomUserPrincipal) authentication.getPrincipal();
            
            User user = userPrincipal.getUser();
            UserResponse userResponse = new UserResponse(user);
            
            return ResponseEntity.ok(userResponse);
            
        } catch (Exception e) {
            log.error("Error getting current user", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/me")
    public ResponseEntity<Map<String, Object>> updateCurrentUser(@RequestBody Map<String, Object> updates) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsServiceImpl.CustomUserPrincipal userPrincipal = 
                (UserDetailsServiceImpl.CustomUserPrincipal) authentication.getPrincipal();
            
            User user = userPrincipal.getUser();
            
            // Update allowed fields
            if (updates.containsKey("firstName")) {
                user.setFirstName((String) updates.get("firstName"));
            }
            if (updates.containsKey("lastName")) {
                user.setLastName((String) updates.get("lastName"));
            }
            if (updates.containsKey("currentCompany")) {
                user.setCurrentCompany((String) updates.get("currentCompany"));
            }
            if (updates.containsKey("position")) {
                user.setPosition((String) updates.get("position"));
            }
            if (updates.containsKey("location")) {
                user.setLocation((String) updates.get("location"));
            }
            if (updates.containsKey("profileImage")) {
                user.setProfileImageUrl((String) updates.get("profileImage"));
            }
            
            userRepository.save(user);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Profile updated successfully"
            ));
            
        } catch (Exception e) {
            log.error("Error updating current user", e);
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to update profile: " + e.getMessage()
            ));
        }
    }
    
    @GetMapping("/directory")
    public ResponseEntity<Map<String, Object>> getAlumniDirectory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String batchYear,
            @RequestParam(required = false) String branch,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String location) {
        
        try {
            Pageable pageable = PageRequest.of(page, size);
            
            Page<User> usersPage = userRepository.findUsersWithFilters(
                searchTerm, batchYear, branch, company, location, User.Role.ALUMNI, pageable
            );
            
            List<UserResponse> users = usersPage.getContent().stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
            
            Map<String, Object> response = Map.of(
                "users", users,
                "currentPage", usersPage.getNumber(),
                "totalPages", usersPage.getTotalPages(),
                "totalElements", usersPage.getTotalElements(),
                "hasNext", usersPage.hasNext(),
                "hasPrevious", usersPage.hasPrevious()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error getting alumni directory", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/filters")
    public ResponseEntity<Map<String, Object>> getFilterOptions() {
        try {
            List<String> batches = userRepository.findDistinctBatchYears();
            List<String> branches = userRepository.findDistinctBranches();
            List<String> companies = userRepository.findDistinctCompanies();
            List<String> locations = userRepository.findDistinctLocations();
            
            Map<String, Object> filters = Map.of(
                "batches", batches,
                "branches", branches,
                "companies", companies,
                "locations", locations
            );
            
            return ResponseEntity.ok(filters);
            
        } catch (Exception e) {
            log.error("Error getting filter options", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getUserStats() {
        try {
            long totalAlumni = userRepository.countActiveAlumni();
            long totalStudents = userRepository.countActiveStudents();
            
            List<Object[]> alumniByBatch = userRepository.getAlumniCountByBatch();
            List<Object[]> alumniByBranch = userRepository.getAlumniCountByBranch();
            List<Object[]> alumniByCompany = userRepository.getAlumniCountByCompany();
            
            Map<String, Object> stats = Map.of(
                "totalAlumni", totalAlumni,
                "totalStudents", totalStudents,
                "alumniByBatch", alumniByBatch,
                "alumniByBranch", alumniByBranch,
                "alumniByCompany", alumniByCompany
            );
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            log.error("Error getting user stats", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            
            if (userOpt.isPresent() && userOpt.get().getIsActive()) {
                UserResponse userResponse = new UserResponse(userOpt.get());
                return ResponseEntity.ok(userResponse);
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("Error getting user by id: {}", id, e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/recent")
    public ResponseEntity<List<UserResponse>> getRecentUsers(
            @RequestParam(defaultValue = "10") int limit) {
        
        try {
            Pageable pageable = PageRequest.of(0, limit);
            Page<User> recentUsers = userRepository.findRecentUsers(pageable);
            
            List<UserResponse> users = recentUsers.getContent().stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(users);
            
        } catch (Exception e) {
            log.error("Error getting recent users", e);
            return ResponseEntity.badRequest().build();
        }
    }
}
