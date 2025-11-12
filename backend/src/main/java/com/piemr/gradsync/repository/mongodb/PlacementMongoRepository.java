package com.piemr.gradsync.repository.mongodb;

import com.piemr.gradsync.entity.mongodb.Placement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PlacementMongoRepository extends MongoRepository<Placement, String> {
    
    // Basic queries
    List<Placement> findByStudentId(String studentId);
    
    List<Placement> findByCompanyId(String companyId);
    
    Page<Placement> findByCompanyId(String companyId, Pageable pageable);
    
    // Status-based queries
    List<Placement> findByStatus(Placement.PlacementStatus status);
    
    Page<Placement> findByStatus(Placement.PlacementStatus status, Pageable pageable);
    
    List<Placement> findByStudentIdAndStatus(String studentId, Placement.PlacementStatus status);
    
    // Type-based queries
    List<Placement> findByPlacementType(Placement.PlacementType placementType);
    
    Page<Placement> findByPlacementType(Placement.PlacementType placementType, Pageable pageable);
    
    // Date-based queries
    List<Placement> findByPlacementDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    Page<Placement> findByPlacementDateBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    
    List<Placement> findByPlacementDateAfter(LocalDateTime date);
    
    List<Placement> findByPlacementDateBefore(LocalDateTime date);
    
    // Package-based queries
    @Query("{ 'packageAmount': { $gte: ?0 } }")
    List<Placement> findByMinimumPackage(Double minPackage);
    
    @Query("{ 'packageAmount': { $gte: ?0, $lte: ?1 } }")
    List<Placement> findByPackageRange(Double minPackage, Double maxPackage);
    
    @Query("{ 'packageAmount': { $gte: ?0, $lte: ?1 } }")
    Page<Placement> findByPackageRange(Double minPackage, Double maxPackage, Pageable pageable);
    
    // Year-based queries
    @Query("{ $expr: { $eq: [{ $year: '$placementDate' }, ?0] } }")
    List<Placement> findByPlacementYear(Integer year);
    
    @Query("{ $expr: { $eq: [{ $year: '$placementDate' }, ?0] } }")
    Page<Placement> findByPlacementYear(Integer year, Pageable pageable);
    
    // Location-based queries
    @Query("{ 'location': { $regex: ?0, $options: 'i' } }")
    List<Placement> findByLocationContaining(String location);
    
    // Designation-based queries
    @Query("{ 'designation': { $regex: ?0, $options: 'i' } }")
    List<Placement> findByDesignationContaining(String designation);
    
    // Combined queries
    @Query("{ 'status': ?0, 'placementDate': { $gte: ?1, $lte: ?2 } }")
    List<Placement> findByStatusAndDateRange(Placement.PlacementStatus status, 
                                           LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("{ 'companyId': ?0, 'status': ?1 }")
    List<Placement> findByCompanyAndStatus(String companyId, Placement.PlacementStatus status);
    
    // Statistics queries
    @Query(value = "{ 'status': ?0 }", count = true)
    long countByStatus(Placement.PlacementStatus status);
    
    @Query(value = "{ 'placementType': ?0 }", count = true)
    long countByPlacementType(Placement.PlacementType placementType);
    
    @Query(value = "{ $expr: { $eq: [{ $year: '$placementDate' }, ?0] } }", count = true)
    long countByPlacementYear(Integer year);
    
    @Query(value = "{ 'companyId': ?0 }", count = true)
    long countByCompanyId(String companyId);
    
    // Aggregation queries for statistics
    @Query("{ $group: { _id: '$companyId', count: { $sum: 1 }, avgPackage: { $avg: '$packageAmount' } } }")
    List<Object> getCompanyWiseStatistics();
    
    @Query("{ $group: { _id: { $year: '$placementDate' }, count: { $sum: 1 }, " +
           "avgPackage: { $avg: '$packageAmount' }, maxPackage: { $max: '$packageAmount' } } }")
    List<Object> getYearWiseStatistics();
    
    // Recent placements
    @Query(value = "{}", sort = "{ 'placementDate': -1 }")
    List<Placement> findRecentPlacements(Pageable pageable);
    
    // Top packages
    @Query(value = "{}", sort = "{ 'packageAmount': -1 }")
    List<Placement> findTopPackages(Pageable pageable);
    
    // Active placements (joined status)
    @Query("{ 'status': 'JOINED' }")
    List<Placement> findActivePlacements();
    
    @Query("{ 'status': 'JOINED' }")
    Page<Placement> findActivePlacements(Pageable pageable);
    
    // Placements pending joining
    @Query("{ 'status': 'OFFERED', 'joiningDate': { $gte: ?0 } }")
    List<Placement> findPendingJoining(LocalDateTime fromDate);
}
