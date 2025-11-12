const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [50, 'Middle name cannot exceed 50 characters']
  },

  // Role and Status
  role: {
    type: String,
    enum: ['ALUMNI', 'STUDENT', 'FACULTY', 'ADMIN'],
    default: 'ALUMNI'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED'],
    default: 'PENDING_VERIFICATION'
  },

  // Academic Information
  batchInfo: {
    admissionYear: {
      type: Number,
      required: [true, 'Admission year is required'],
      min: [2008, 'Admission year cannot be before 2008'],
      max: [2030, 'Admission year cannot be after 2030']
    },
    graduationYear: {
      type: Number,
      required: [true, 'Graduation year is required'],
      min: [2012, 'Graduation year cannot be before 2012'],
      max: [2034, 'Graduation year cannot be after 2034']
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CHEMICAL', 'BIOTECH']
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      uppercase: true
    },
    cgpa: {
      type: Number,
      min: [0, 'CGPA cannot be negative'],
      max: [10, 'CGPA cannot exceed 10']
    },
    division: {
      type: String,
      enum: ['FIRST', 'SECOND', 'THIRD', 'PASS']
    }
  },

  // Contact Information
  contact: {
    phone: {
      type: String,
      match: [/^[+]?[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    alternatePhone: {
      type: String,
      match: [/^[+]?[0-9]{10,15}$/, 'Please enter a valid alternate phone number']
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        default: 'India'
      },
      pincode: String
    }
  },

  // Professional Information
  professional: {
    currentCompany: String,
    designation: String,
    workLocation: String,
    experienceYears: {
      type: Number,
      min: [0, 'Experience years cannot be negative']
    },
    currentSalary: Number,
    workType: {
      type: String,
      enum: ['FULL_TIME', 'PART_TIME', 'FREELANCE', 'INTERN', 'UNEMPLOYED', 'ENTREPRENEUR']
    },
    industry: String,
    skills: [String],
    workHistory: [{
      company: String,
      designation: String,
      startDate: Date,
      endDate: Date,
      location: String,
      description: String,
      salary: Number
    }]
  },

  // Social Links
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String,
    twitter: String,
    instagram: String
  },

  // Profile Information
  profile: {
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot exceed 1000 characters']
    },
    profileImage: String,
    coverImage: String,
    achievements: [String],
    interests: [String]
  },

  // Verification and Security
  verification: {
    emailVerified: {
      type: Boolean,
      default: false
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    profileVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },

  lastLogin: Date
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for batch display
userSchema.virtual('batchDisplay').get(function() {
  return `${this.batchInfo.admissionYear}-${this.batchInfo.graduationYear}`;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if user is alumni
userSchema.methods.isAlumni = function() {
  return this.role === 'ALUMNI';
};

// Instance method to check if user is student
userSchema.methods.isStudent = function() {
  return this.role === 'STUDENT';
};

// Static method to find users by batch
userSchema.statics.findByBatch = function(graduationYear, branch) {
  return this.find({
    'batchInfo.graduationYear': graduationYear,
    'batchInfo.branch': branch
  });
};

// Index for text search
userSchema.index({
  firstName: 'text',
  lastName: 'text',
  'professional.currentCompany': 'text',
  'professional.designation': 'text'
});

module.exports = mongoose.model('User', userSchema);
