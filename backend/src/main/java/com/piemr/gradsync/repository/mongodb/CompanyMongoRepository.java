package com.piemr.gradsync.repository.mongodb;

import com.piemr.gradsync.entity.mongodb.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyMongoRepository extends MongoRepository<Company, String> {
    
    // Basic queries
    Optional<Company> findByName(String name);
    
    Optional<Company> findByNameIgnoreCase(String name);
    
    boolean existsByName(String name);
    
    List<Company> findByNameContainingIgnoreCase(String name);
    
    // Industry-based queries
    List<Company> findByIndustry(String industry);
    
    Page<Company> findByIndustry(String industry, Pageable pageable);
    
    List<Company> findByIndustryContainingIgnoreCase(String industry);
    
    // Size-based queries
    List<Company> findBySize(Company.CompanySize size);
    
    // Active companies
    List<Company> findByIsActive(Boolean isActive);
    
    Page<Company> findByIsActive(Boolean isActive, Pageable pageable);
    
    // Location-based queries
    @Query("{ 'location': { $regex: ?0, $options: 'i' } }")
    List<Company> findByLocationContaining(String location);
    
    // Text search
    @Query("{ $text: { $search: ?0 } }")
    List<Company> findByTextSearch(String searchText);
    
    @Query("{ $text: { $search: ?0 } }")
    Page<Company> findByTextSearch(String searchText, Pageable pageable);
    
    // Top recruiters (companies that hired most students)
    @Query(value = "{ 'hiringHistory': { $exists: true, $not: { $size: 0 } } }", 
           sort = "{ 'hiringHistory.studentsHired': -1 }")
    List<Company> findTopRecruiters(Pageable pageable);
    
    // Companies with hiring history in specific year
    @Query("{ 'hiringHistory.year': ?0 }")
    List<Company> findCompaniesByHiringYear(Integer year);
    
    // Companies with minimum students hired
    @Query("{ 'hiringHistory': { $elemMatch: { 'studentsHired': { $gte: ?0 } } } }")
    List<Company> findCompaniesWithMinimumHires(Integer minHires);
    
    // Companies offering packages above threshold
    @Query("{ 'hiringHistory': { $elemMatch: { 'averagePackage': { $gte: ?0 } } } }")
    List<Company> findCompaniesWithMinimumPackage(Double minPackage);
    
    // Recent companies (added in last N days)
    @Query("{ 'createdAt': { $gte: ?0 } }")
    List<Company> findRecentCompanies(java.time.LocalDateTime since);
    
    // Companies by technology/services
    @Query("{ 'details.technologies': { $in: ?0 } }")
    List<Company> findByTechnologies(List<String> technologies);
    
    @Query("{ 'details.services': { $in: ?0 } }")
    List<Company> findByServices(List<String> services);
    
    // Statistics queries
    @Query(value = "{ 'industry': ?0 }", count = true)
    long countByIndustry(String industry);
    
    @Query(value = "{ 'size': ?0 }", count = true)
    long countBySize(Company.CompanySize size);
}
