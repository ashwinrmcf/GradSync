package com.piemr.gradsync.repository;

import com.piemr.gradsync.entity.JobPosting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    
    // Active job postings
    Page<JobPosting> findByIsActiveTrueOrderByCreatedAtDesc(Pageable pageable);
    
    // Search and filter jobs
    @Query("SELECT j FROM JobPosting j WHERE " +
           "j.isActive = true AND " +
           "(:searchTerm IS NULL OR :searchTerm = '' OR " +
           "LOWER(j.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(j.company) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:jobType IS NULL OR j.jobType = :jobType) AND " +
           "(:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:experienceLevel IS NULL OR :experienceLevel = '' OR j.experienceLevel = :experienceLevel) AND " +
           "(:company IS NULL OR :company = '' OR LOWER(j.company) LIKE LOWER(CONCAT('%', :company, '%'))) " +
           "ORDER BY j.isUrgent DESC, j.createdAt DESC")
    Page<JobPosting> findJobsWithFilters(
            @Param("searchTerm") String searchTerm,
            @Param("jobType") JobPosting.JobType jobType,
            @Param("location") String location,
            @Param("experienceLevel") String experienceLevel,
            @Param("company") String company,
            Pageable pageable
    );
    
    // Jobs by user
    Page<JobPosting> findByPostedByIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    List<JobPosting> findByPostedByIdAndIsActiveTrue(Long userId);
    
    // Job type queries
    List<JobPosting> findByJobTypeAndIsActiveTrueOrderByCreatedAtDesc(JobPosting.JobType jobType);
    
    // Company queries
    List<JobPosting> findByCompanyAndIsActiveTrueOrderByCreatedAtDesc(String company);
    
    @Query("SELECT DISTINCT j.company FROM JobPosting j WHERE j.isActive = true ORDER BY j.company")
    List<String> findDistinctCompanies();
    
    @Query("SELECT DISTINCT j.location FROM JobPosting j WHERE j.isActive = true ORDER BY j.location")
    List<String> findDistinctLocations();
    
    @Query("SELECT DISTINCT j.experienceLevel FROM JobPosting j WHERE j.isActive = true ORDER BY j.experienceLevel")
    List<String> findDistinctExperienceLevels();
    
    // Urgent jobs
    List<JobPosting> findByIsUrgentTrueAndIsActiveTrueOrderByCreatedAtDesc();
    
    // Recent jobs
    @Query("SELECT j FROM JobPosting j WHERE j.isActive = true ORDER BY j.createdAt DESC")
    Page<JobPosting> findRecentJobs(Pageable pageable);
    
    // Expiring jobs
    @Query("SELECT j FROM JobPosting j WHERE j.isActive = true AND j.applicationDeadline IS NOT NULL AND j.applicationDeadline BETWEEN :startDate AND :endDate ORDER BY j.applicationDeadline ASC")
    List<JobPosting> findJobsExpiringBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Jobs expiring soon (within 7 days)
    @Query("SELECT j FROM JobPosting j WHERE j.isActive = true AND j.applicationDeadline IS NOT NULL AND j.applicationDeadline BETWEEN CURRENT_TIMESTAMP AND :sevenDaysFromNow ORDER BY j.applicationDeadline ASC")
    List<JobPosting> findJobsExpiringSoon(@Param("sevenDaysFromNow") LocalDateTime sevenDaysFromNow);
    
    // Statistics queries
    @Query("SELECT COUNT(j) FROM JobPosting j WHERE j.isActive = true")
    long countActiveJobs();
    
    @Query("SELECT j.jobType, COUNT(j) FROM JobPosting j WHERE j.isActive = true GROUP BY j.jobType ORDER BY COUNT(j) DESC")
    List<Object[]> getJobCountByType();
    
    @Query("SELECT j.company, COUNT(j) FROM JobPosting j WHERE j.isActive = true GROUP BY j.company ORDER BY COUNT(j) DESC")
    List<Object[]> getJobCountByCompany();
    
    @Query("SELECT j.location, COUNT(j) FROM JobPosting j WHERE j.isActive = true GROUP BY j.location ORDER BY COUNT(j) DESC")
    List<Object[]> getJobCountByLocation();
    
    // Jobs with most applications
    @Query("SELECT j FROM JobPosting j WHERE j.isActive = true ORDER BY SIZE(j.applications) DESC")
    Page<JobPosting> findJobsWithMostApplications(Pageable pageable);
    
    // Jobs posted in date range
    @Query("SELECT j FROM JobPosting j WHERE j.isActive = true AND j.createdAt BETWEEN :startDate AND :endDate ORDER BY j.createdAt DESC")
    List<JobPosting> findJobsPostedBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Jobs by salary range (if needed for future filtering)
    @Query("SELECT j FROM JobPosting j WHERE j.isActive = true AND j.salaryRange IS NOT NULL ORDER BY j.createdAt DESC")
    List<JobPosting> findJobsWithSalary();
}
