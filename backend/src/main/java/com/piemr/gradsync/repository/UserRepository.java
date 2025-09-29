package com.piemr.gradsync.repository;

import com.piemr.gradsync.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Authentication queries
    Optional<User> findByEmail(String email);
    Optional<User> findByRollNumber(String rollNumber);
    boolean existsByEmail(String email);
    boolean existsByRollNumber(String rollNumber);
    
    // User search and filtering
    @Query("SELECT u FROM User u WHERE " +
           "(:searchTerm IS NULL OR :searchTerm = '' OR " +
           "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.currentCompany) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.position) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:batchYear IS NULL OR :batchYear = '' OR u.batchYear = :batchYear) AND " +
           "(:branch IS NULL OR :branch = '' OR u.branch = :branch) AND " +
           "(:company IS NULL OR :company = '' OR u.currentCompany = :company) AND " +
           "(:location IS NULL OR :location = '' OR u.location = :location) AND " +
           "(:role IS NULL OR u.role = :role) AND " +
           "u.isActive = true")
    Page<User> findUsersWithFilters(
            @Param("searchTerm") String searchTerm,
            @Param("batchYear") String batchYear,
            @Param("branch") String branch,
            @Param("company") String company,
            @Param("location") String location,
            @Param("role") User.Role role,
            Pageable pageable
    );
    
    // Alumni specific queries
    List<User> findByRoleAndIsActiveTrue(User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.role = 'ALUMNI' AND u.isActive = true ORDER BY u.createdAt DESC")
    Page<User> findActiveAlumni(Pageable pageable);
    
    // Batch and branch queries
    List<User> findByBatchYearAndIsActiveTrue(String batchYear);
    List<User> findByBranchAndIsActiveTrue(String branch);
    List<User> findByBatchYearAndBranchAndIsActiveTrue(String batchYear, String branch);
    
    // Company queries
    List<User> findByCurrentCompanyAndIsActiveTrue(String company);
    
    @Query("SELECT DISTINCT u.currentCompany FROM User u WHERE u.currentCompany IS NOT NULL AND u.isActive = true ORDER BY u.currentCompany")
    List<String> findDistinctCompanies();
    
    @Query("SELECT DISTINCT u.location FROM User u WHERE u.location IS NOT NULL AND u.isActive = true ORDER BY u.location")
    List<String> findDistinctLocations();
    
    @Query("SELECT DISTINCT u.batchYear FROM User u WHERE u.isActive = true ORDER BY u.batchYear DESC")
    List<String> findDistinctBatchYears();
    
    @Query("SELECT DISTINCT u.branch FROM User u WHERE u.isActive = true ORDER BY u.branch")
    List<String> findDistinctBranches();
    
    // Statistics queries
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'ALUMNI' AND u.isActive = true")
    long countActiveAlumni();
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'STUDENT' AND u.isActive = true")
    long countActiveStudents();
    
    @Query("SELECT u.batchYear, COUNT(u) FROM User u WHERE u.role = 'ALUMNI' AND u.isActive = true GROUP BY u.batchYear ORDER BY u.batchYear DESC")
    List<Object[]> getAlumniCountByBatch();
    
    @Query("SELECT u.branch, COUNT(u) FROM User u WHERE u.role = 'ALUMNI' AND u.isActive = true GROUP BY u.branch ORDER BY COUNT(u) DESC")
    List<Object[]> getAlumniCountByBranch();
    
    @Query("SELECT u.currentCompany, COUNT(u) FROM User u WHERE u.currentCompany IS NOT NULL AND u.role = 'ALUMNI' AND u.isActive = true GROUP BY u.currentCompany ORDER BY COUNT(u) DESC")
    List<Object[]> getAlumniCountByCompany();
    
    // Recent users
    @Query("SELECT u FROM User u WHERE u.isActive = true ORDER BY u.createdAt DESC")
    Page<User> findRecentUsers(Pageable pageable);
    
    // Verification queries
    List<User> findByIsVerifiedFalseAndIsActiveTrue();
    
    @Query("SELECT u FROM User u WHERE u.emailVerified = false AND u.isActive = true")
    List<User> findUnverifiedEmails();
}
