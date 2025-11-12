package com.piemr.gradsync.repository.mongodb;

import com.piemr.gradsync.entity.mongodb.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMongoRepository extends MongoRepository<User, String> {
    
    // Basic queries
    Optional<User> findByEmail(String email);
    
    Optional<User> findByBatchInfoRollNumber(String rollNumber);
    
    boolean existsByEmail(String email);
    
    boolean existsByBatchInfoRollNumber(String rollNumber);
    
    // Batch-related queries
    List<User> findByBatchInfoGraduationYear(Integer graduationYear);
    
    List<User> findByBatchInfoGraduationYearAndBatchInfoBranch(Integer graduationYear, String branch);
    
    Page<User> findByBatchInfoGraduationYearAndBatchInfoBranch(
            Integer graduationYear, String branch, Pageable pageable);
    
    // Role-based queries
    List<User> findByRole(User.Role role);
    
    Page<User> findByRole(User.Role role, Pageable pageable);
    
    List<User> findByRoleAndStatus(User.Role role, User.Status status);
    
    // Professional queries
    List<User> findByProfessionalCurrentCompany(String company);
    
    Page<User> findByProfessionalCurrentCompany(String company, Pageable pageable);
    
    List<User> findByProfessionalCurrentCompanyContainingIgnoreCase(String company);
    
    // Search queries
    @Query("{ $text: { $search: ?0 } }")
    List<User> findByTextSearch(String searchText);
    
    @Query("{ $text: { $search: ?0 } }")
    Page<User> findByTextSearch(String searchText, Pageable pageable);
    
    // Complex queries
    @Query("{ 'batchInfo.graduationYear': { $gte: ?0, $lte: ?1 } }")
    List<User> findByGraduationYearRange(Integer startYear, Integer endYear);
    
    @Query("{ 'batchInfo.graduationYear': { $gte: ?0, $lte: ?1 }, 'batchInfo.branch': ?2 }")
    List<User> findByGraduationYearRangeAndBranch(Integer startYear, Integer endYear, String branch);
    
    // Alumni with placement information
    @Query("{ 'role': 'ALUMNI', 'professional.currentCompany': { $exists: true, $ne: null } }")
    List<User> findPlacedAlumni();
    
    @Query("{ 'role': 'ALUMNI', 'professional.currentCompany': { $exists: true, $ne: null } }")
    Page<User> findPlacedAlumni(Pageable pageable);
    
    // Statistics queries
    @Query(value = "{ 'batchInfo.graduationYear': ?0, 'batchInfo.branch': ?1 }", count = true)
    long countByBatch(Integer graduationYear, String branch);
    
    @Query(value = "{ 'role': 'ALUMNI', 'professional.currentCompany': { $exists: true, $ne: null }, " +
           "'batchInfo.graduationYear': ?0, 'batchInfo.branch': ?1 }", count = true)
    long countPlacedAlumniByBatch(Integer graduationYear, String branch);
    
    // Verification queries
    List<User> findByVerificationEmailVerified(Boolean emailVerified);
    
    List<User> findByStatus(User.Status status);
    
    // Skills-based search
    @Query("{ 'professional.skills': { $in: ?0 } }")
    List<User> findBySkills(List<String> skills);
    
    @Query("{ 'professional.skills': { $in: ?0 } }")
    Page<User> findBySkills(List<String> skills, Pageable pageable);
    
    // Location-based search
    @Query("{ 'professional.workLocation': { $regex: ?0, $options: 'i' } }")
    List<User> findByWorkLocation(String location);
    
    // Experience-based search
    @Query("{ 'professional.experienceYears': { $gte: ?0, $lte: ?1 } }")
    List<User> findByExperienceRange(Integer minExperience, Integer maxExperience);
    
    // Recent graduates
    @Query("{ 'batchInfo.graduationYear': { $gte: ?0 } }")
    List<User> findRecentGraduates(Integer fromYear);
    
    // Active users
    List<User> findByStatusAndLastLoginAfter(User.Status status, java.time.LocalDateTime since);
}
