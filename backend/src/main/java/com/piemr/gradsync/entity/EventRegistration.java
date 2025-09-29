package com.piemr.gradsync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_registrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class EventRegistration {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RegistrationStatus status = RegistrationStatus.REGISTERED;
    
    @Column(name = "special_requirements", columnDefinition = "TEXT")
    private String specialRequirements;
    
    @Column(name = "payment_status")
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.NOT_REQUIRED;
    
    @Column(name = "payment_reference")
    private String paymentReference;
    
    @Column(name = "attended", nullable = false)
    private Boolean attended = false;
    
    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;
    
    @Column(name = "rating")
    private Integer rating; // 1-5 stars
    
    @CreatedDate
    @Column(name = "registered_at", nullable = false, updatable = false)
    private LocalDateTime registeredAt;
    
    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;
    
    // Enums
    public enum RegistrationStatus {
        REGISTERED("Registered"),
        CONFIRMED("Confirmed"),
        CANCELLED("Cancelled"),
        WAITLISTED("Waitlisted");
        
        private final String displayName;
        
        RegistrationStatus(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    public enum PaymentStatus {
        NOT_REQUIRED("Not Required"),
        PENDING("Pending"),
        COMPLETED("Completed"),
        FAILED("Failed"),
        REFUNDED("Refunded");
        
        private final String displayName;
        
        PaymentStatus(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Helper methods
    public boolean isActive() {
        return status == RegistrationStatus.REGISTERED || status == RegistrationStatus.CONFIRMED;
    }
    
    public boolean isCancelled() {
        return status == RegistrationStatus.CANCELLED;
    }
    
    public boolean isWaitlisted() {
        return status == RegistrationStatus.WAITLISTED;
    }
}
