package com.piemr.gradsync.repository.mongodb;

import com.piemr.gradsync.entity.mongodb.Batch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BatchMongoRepository extends MongoRepository<Batch, String> {
    
    // Basic queries
    Optional<Batch> findByGraduationYearAndBranch(Integer graduationYear, String branch);
    
    List<Batch> findByGraduationYear(Integer graduationYear);
    
    List<Batch> findByBranch(String branch);
    
    Page<Batch> findByBranch(String branch, Pageable pageable);
    
    // Active batches
    List<Batch> findByIsActive(Boolean isActive);
    
    Page<Batch> findByIsActive(Boolean isActive, Pageable pageable);
    
    // Year range queries
    @Query("{ 'graduationYear': { $gte: ?0, $lte: ?1 } }")
    List<Batch> findByGraduationYearRange(Integer startYear, Integer endYear);
    
    @Query("{ 'graduationYear': { $gte: ?0, $lte: ?1 } }")
    Page<Batch> findByGraduationYearRange(Integer startYear, Integer endYear, Pageable pageable);
    
    // Graduated batches (past years)
    @Query("{ 'graduationYear': { $lte: ?0 } }")
    List<Batch> findGraduatedBatches(Integer currentYear);
    
    // Current/Active batches (future years)
    @Query("{ 'graduationYear': { $gt: ?0 } }")
    List<Batch> findCurrentBatches(Integer currentYear);
    
    // Placement statistics queries
    @Query("{ 'placementPercentage': { $gte: ?0 } }")
    List<Batch> findByMinimumPlacementPercentage(Double minPercentage);
    
    @Query("{ 'averagePackage': { $gte: ?0 } }")
    List<Batch> findByMinimumAveragePackage(Double minPackage);
    
    // Top performing batches
    @Query(value = "{}", sort = "{ 'placementPercentage': -1 }")
    List<Batch> findTopBatchesByPlacement(Pageable pageable);
    
    @Query(value = "{}", sort = "{ 'averagePackage': -1 }")
    List<Batch> findTopBatchesByPackage(Pageable pageable);
    
    // Statistics queries
    @Query(value = "{ 'graduationYear': ?0 }", count = true)
    long countByGraduationYear(Integer graduationYear);
    
    @Query(value = "{ 'branch': ?0 }", count = true)
    long countByBranch(String branch);
    
    // Aggregation queries for statistics
    @Query("{ $group: { _id: '$branch', totalStudents: { $sum: '$totalStudents' }, " +
           "avgPlacement: { $avg: '$placementPercentage' } } }")
    List<Object> getBranchWiseStatistics();
    
    // Recent batches
    @Query(value = "{}", sort = "{ 'graduationYear': -1 }")
    List<Batch> findRecentBatches(Pageable pageable);
    
    // Batches with specific recruiters
    @Query("{ 'topRecruiters': { $in: ?0 } }")
    List<Batch> findBatchesWithRecruiters(List<String> recruiters);
    
    // Batches by coordinator
    List<Batch> findByBatchCoordinator(String coordinatorId);
    
    // Custom queries for dashboard
    @Query("{ 'isActive': true, 'graduationYear': { $gte: ?0 } }")
    List<Batch> findActiveBatchesFromYear(Integer fromYear);
    
    // Batch performance queries
    @Query("{ 'placementPercentage': { $gte: ?0, $lte: ?1 } }")
    List<Batch> findByPlacementPercentageRange(Double minPercentage, Double maxPercentage);
    
    @Query("{ 'averagePackage': { $gte: ?0, $lte: ?1 } }")
    List<Batch> findByAveragePackageRange(Double minPackage, Double maxPackage);
}
