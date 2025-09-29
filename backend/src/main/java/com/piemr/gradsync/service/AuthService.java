package com.piemr.gradsync.service;

import com.piemr.gradsync.dto.auth.AuthResponse;
import com.piemr.gradsync.dto.auth.LoginRequest;
import com.piemr.gradsync.dto.auth.RegisterRequest;
import com.piemr.gradsync.dto.user.UserResponse;
import com.piemr.gradsync.entity.User;
import com.piemr.gradsync.repository.UserRepository;
import com.piemr.gradsync.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        try {
            // Validate if user already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                return new AuthResponse("Email already registered", false);
            }
            
            if (userRepository.existsByRollNumber(request.getRollNumber())) {
                return new AuthResponse("Roll number already registered", false);
            }
            
            // Create new user
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setBatchYear(request.getBatchYear());
            user.setBranch(request.getBranch());
            user.setRollNumber(request.getRollNumber());
            user.setCurrentCompany(request.getCurrentCompany());
            user.setPosition(request.getPosition());
            user.setLocation(request.getLocation());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setLinkedinUrl(request.getLinkedinUrl());
            user.setPortfolioUrl(request.getPortfolioUrl());
            user.setBio(request.getBio());
            user.setRole(request.getRole());
            user.setIsActive(true);
            user.setIsVerified(false);
            user.setEmailVerified(false);
            
            // Generate profile image URL if not provided
            if (user.getProfileImageUrl() == null) {
                user.setProfileImageUrl(generateAvatarUrl(user.getFirstName(), user.getLastName()));
            }
            
            // Save user
            User savedUser = userRepository.save(user);
            log.info("New user registered: {} ({})", savedUser.getEmail(), savedUser.getRole());
            
            // Generate tokens
            UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
            Map<String, Object> extraClaims = createTokenClaims(savedUser);
            
            String accessToken = jwtUtil.generateToken(userDetails, extraClaims);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails);
            
            // Update last login
            savedUser.setLastLogin(LocalDateTime.now());
            userRepository.save(savedUser);
            
            UserResponse userResponse = new UserResponse(savedUser);
            
            return new AuthResponse(
                accessToken,
                refreshToken,
                jwtUtil.getExpirationTime(),
                userResponse
            );
            
        } catch (Exception e) {
            log.error("Registration failed for email: {}", request.getEmail(), e);
            return new AuthResponse("Registration failed: " + e.getMessage(), false);
        }
    }
    
    @Transactional
    public AuthResponse login(LoginRequest request) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            
            // Get user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            
            // Check if user is active
            if (!user.getIsActive()) {
                return new AuthResponse("Account is deactivated", false);
            }
            
            // Generate tokens
            Map<String, Object> extraClaims = createTokenClaims(user);
            String accessToken = jwtUtil.generateToken(userDetails, extraClaims);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails);
            
            // Update last login
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            
            UserResponse userResponse = new UserResponse(user);
            
            log.info("User logged in: {} ({})", user.getEmail(), user.getRole());
            
            return new AuthResponse(
                accessToken,
                refreshToken,
                jwtUtil.getExpirationTime(),
                userResponse
            );
            
        } catch (BadCredentialsException e) {
            log.warn("Login failed for email: {} - Invalid credentials", request.getEmail());
            return new AuthResponse("Invalid email or password", false);
        } catch (Exception e) {
            log.error("Login failed for email: {}", request.getEmail(), e);
            return new AuthResponse("Login failed: " + e.getMessage(), false);
        }
    }
    
    public AuthResponse refreshToken(String refreshToken) {
        try {
            if (!jwtUtil.validateToken(refreshToken) || !jwtUtil.isRefreshToken(refreshToken)) {
                return new AuthResponse("Invalid refresh token", false);
            }
            
            String email = jwtUtil.extractUsername(refreshToken);
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            
            if (!user.getIsActive()) {
                return new AuthResponse("Account is deactivated", false);
            }
            
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            Map<String, Object> extraClaims = createTokenClaims(user);
            
            String newAccessToken = jwtUtil.generateToken(userDetails, extraClaims);
            String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);
            
            UserResponse userResponse = new UserResponse(user);
            
            return new AuthResponse(
                newAccessToken,
                newRefreshToken,
                jwtUtil.getExpirationTime(),
                userResponse
            );
            
        } catch (Exception e) {
            log.error("Token refresh failed", e);
            return new AuthResponse("Token refresh failed", false);
        }
    }
    
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }
    
    public String extractEmailFromToken(String token) {
        return jwtUtil.extractUsername(token);
    }
    
    private Map<String, Object> createTokenClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRole().name());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        claims.put("batchYear", user.getBatchYear());
        claims.put("branch", user.getBranch());
        claims.put("isVerified", user.getIsVerified());
        return claims;
    }
    
    private String generateAvatarUrl(String firstName, String lastName) {
        return String.format("https://ui-avatars.com/api/?name=%s+%s&background=1e40af&color=fff&size=400", 
                            firstName, lastName);
    }
    
    @Transactional
    public boolean changePassword(String email, String oldPassword, String newPassword) {
        try {
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            
            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                return false;
            }
            
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            
            log.info("Password changed for user: {}", email);
            return true;
            
        } catch (Exception e) {
            log.error("Password change failed for user: {}", email, e);
            return false;
        }
    }
    
    @Transactional
    public boolean resetPassword(String email, String newPassword) {
        try {
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            
            log.info("Password reset for user: {}", email);
            return true;
            
        } catch (Exception e) {
            log.error("Password reset failed for user: {}", email, e);
            return false;
        }
    }
    
    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public boolean rollNumberExists(String rollNumber) {
        return userRepository.existsByRollNumber(rollNumber);
    }
}
