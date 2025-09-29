package com.piemr.gradsync.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Event title is required")
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Event date is required")
    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;
    
    @Column(name = "end_date")
    private LocalDateTime endDate;
    
    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    private EventType eventType;
    
    @Column(name = "max_participants")
    private Integer maxParticipants;
    
    @Column(name = "registration_deadline")
    private LocalDateTime registrationDeadline;
    
    @Column(name = "is_free", nullable = false)
    private Boolean isFree = true;
    
    @Column(name = "registration_fee")
    private Double registrationFee;
    
    @Column(name = "event_image_url")
    private String eventImageUrl;
    
    @Column(name = "meeting_link")
    private String meetingLink; // For virtual events
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(columnDefinition = "TEXT")
    private String agenda; // JSON string of agenda items
    
    @Column(columnDefinition = "TEXT")
    private String speakers; // JSON string of speaker details
    
    @Column(columnDefinition = "TEXT")
    private String requirements;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;
    
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<EventRegistration> registrations = new HashSet<>();
    
    // Enums
    public enum EventType {
        REUNION("Reunion"),
        WORKSHOP("Workshop"),
        WEBINAR("Webinar"),
        NETWORKING("Networking"),
        CAREER_FAIR("Career Fair"),
        SEMINAR("Seminar"),
        CONFERENCE("Conference"),
        SOCIAL("Social Event"),
        SPORTS("Sports Event"),
        CULTURAL("Cultural Event");
        
        private final String displayName;
        
        EventType(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Helper methods
    public int getRegistrationCount() {
        return registrations != null ? registrations.size() : 0;
    }
    
    public boolean isFull() {
        return maxParticipants != null && getRegistrationCount() >= maxParticipants;
    }
    
    public boolean isRegistrationOpen() {
        LocalDateTime now = LocalDateTime.now();
        return isActive && 
               (registrationDeadline == null || now.isBefore(registrationDeadline)) &&
               now.isBefore(eventDate) &&
               !isFull();
    }
    
    public boolean isPastEvent() {
        return eventDate.isBefore(LocalDateTime.now());
    }
    
    public boolean isUpcoming() {
        return eventDate.isAfter(LocalDateTime.now());
    }
}
