# 🚀 GradSync Real Data Integration Guide

## 📋 Overview
This guide will help you replace the mock data in your GradSync website with real NBA 2025 placement data from your Excel file.

## 🎯 Current Status
- ✅ MongoDB schema created
- ✅ Excel data processor built
- ✅ API endpoints ready
- ✅ Frontend running with mock data
- 🔄 **Next**: Import real data and connect frontend

## 📊 Your NBA 2025 Data
- **46 CSE students** from batch 2018-2022
- **Companies**: Zehntech Technologies, Amazon, Infosys, TCS, Oracle, Microsoft, etc.
- **Enrollment Numbers**: 0863CS181002, 0863CS181003, etc.
- **Appointment Info**: Dates and reference numbers

## 🚀 Step-by-Step Integration

### Step 1: Start Your Backend
```bash
cd backend
mvn spring-boot:run
```
Backend should start on `http://localhost:8080`

### Step 2: Import NBA 2025 Data
Use the `import-nba-data.http` file:

1. **Login as admin** (get JWT token)
2. **Preview data** to verify Excel structure
3. **Import data** - this will create 46 student records
4. **Verify import** - check if data was imported correctly

### Step 3: Update Frontend Components

#### A. Update BatchesSection Component
Replace mock data with real API calls:

```javascript
// In src/components/BatchesSection.tsx
import { batchAPI } from '../lib/api-integration';

const BatchesSection = ({ showAll = false, maxBatches = 6 }) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealBatches = async () => {
      try {
        const response = await batchAPI.getAll();
        setBatches(response.batches);
      } catch (error) {
        console.error('Error fetching batches:', error);
        // Fallback to mock data if API fails
        setBatches(generateBatchData());
      } finally {
        setLoading(false);
      }
    };

    fetchRealBatches();
  }, []);

  // Rest of component remains the same
};
```

#### B. Update Directory Page
Replace mock alumni with real data:

```javascript
// In src/app/directory/page.tsx
import { alumniAPI } from '../lib/api-integration';

const DirectoryPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealAlumni = async () => {
      try {
        const response = await alumniAPI.getAll(0, 12);
        setAlumni(response.alumni);
        setPagination({
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          currentPage: response.currentPage
        });
      } catch (error) {
        console.error('Error fetching alumni:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealAlumni();
  }, []);

  // Update the alumni cards to show real data
  const alumniCards = alumni.map(person => (
    <AlumniCard key={person.id} alumni={person} />
  ));
};
```

#### C. Update Batch Directory
Show real students for each batch:

```javascript
// Create new component: src/components/BatchDirectory.tsx
import { alumniAPI } from '../lib/api-integration';

const BatchDirectory = ({ graduationYear, branch }) => {
  const [batchData, setBatchData] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchBatchStudents = async () => {
      try {
        const response = await alumniAPI.getByBatch(graduationYear, branch);
        setBatchData(response.batchStats);
        setStudents(response.alumni);
      } catch (error) {
        console.error('Error fetching batch data:', error);
      }
    };

    fetchBatchStudents();
  }, [graduationYear, branch]);

  return (
    <div className="batch-directory">
      <h2>CSE Batch 2018-2022 Directory</h2>
      <div className="batch-stats">
        <p>Total Students: {batchData?.totalStudents}</p>
        <p>Placed Students: {batchData?.placedStudents}</p>
        <p>Placement Rate: {batchData?.placementPercentage}%</p>
      </div>
      
      <div className="students-grid">
        {students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};
```

### Step 4: Create Student Card Component
Display real student information:

```javascript
// src/components/StudentCard.tsx
const StudentCard = ({ student }) => (
  <div className="student-card">
    <div className="student-header">
      <h3>{student.name}</h3>
      <span className="roll-number">{student.rollNumber}</span>
    </div>
    
    <div className="student-details">
      <p><strong>Branch:</strong> {student.branch}</p>
      <p><strong>Batch:</strong> {student.batchDisplay}</p>
      
      {student.company && (
        <div className="placement-info">
          <p><strong>Company:</strong> {student.company}</p>
          <p><strong>Designation:</strong> {student.designation}</p>
          {student.appointmentInfo && (
            <p><strong>Appointment:</strong> {student.appointmentInfo}</p>
          )}
        </div>
      )}
      
      <div className="contact-info">
        <p><strong>Email:</strong> {student.email}</p>
        {student.phone && <p><strong>Phone:</strong> {student.phone}</p>}
      </div>
    </div>
    
    <div className="student-actions">
      <button className="connect-btn">Connect</button>
      {student.linkedin && (
        <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      )}
    </div>
  </div>
);
```

### Step 5: Update Statistics
Show real placement statistics:

```javascript
// In src/components/StatsSection.tsx
import { batchAPI } from '../lib/api-integration';

const StatsSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchRealStats = async () => {
      try {
        const response = await batchAPI.getStats();
        setStats(response);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchRealStats();
  }, []);

  return (
    <section className="stats-section">
      <div className="stat-card">
        <h3>{stats?.totalStudents || 0}+</h3>
        <p>Total Alumni</p>
      </div>
      <div className="stat-card">
        <h3>{stats?.totalPlaced || 0}</h3>
        <p>Placed Students</p>
      </div>
      <div className="stat-card">
        <h3>{stats?.averagePlacementRate || 0}%</h3>
        <p>Placement Rate</p>
      </div>
      <div className="stat-card">
        <h3>{stats?.totalBatches || 0}</h3>
        <p>Batches</p>
      </div>
    </section>
  );
};
```

## 🔧 Testing Your Integration

### 1. Import Data
Run the import process using `import-nba-data.http`

### 2. Test API Endpoints
- `GET /api/alumni` - Should return 46 CSE students
- `GET /api/batches/2022/CSE` - Should return CSE batch details
- `GET /api/alumni/company/Zehntech` - Should return Zehntech employees

### 3. Verify Frontend
- **Home Page**: Should show real statistics
- **Directory**: Should show 46 real alumni profiles
- **Batches**: Should show CSE 2018-2022 with real data
- **Search**: Should find students by name/company

## 📊 Expected Results

After integration, your website will show:

### Real Alumni Profiles:
- **Abhinay Sharma** (0863ME181002) - iLEAD Group
- **Aman Kumar Bamaliya** (0863CS181002) - Systematix Infotech
- **Anirudh Kulkarni** (0863CS181003) - Amazon Customer Service
- **And 43 more real students...**

### Real Statistics:
- **46 Total Students** in CSE 2018-2022
- **46 Placed Students** (100% placement)
- **Top Companies**: Zehntech, Amazon, Infosys, TCS, Oracle, Microsoft

### Real Company Data:
- **Zehntech Technologies**: 8 students placed
- **Amazon**: Multiple positions
- **Infosys, TCS, Oracle**: Major recruiters

## 🚨 Troubleshooting

### Common Issues:
1. **CORS Error**: Make sure backend allows frontend origin
2. **Authentication**: Ensure JWT token is included in requests
3. **Data Not Showing**: Check if import was successful
4. **API Errors**: Verify backend is running on port 8080

### Debug Steps:
1. Check browser console for errors
2. Verify API responses in Network tab
3. Test endpoints directly using HTTP files
4. Check MongoDB data using database tools

## 🎉 Success Indicators

✅ **Home page** shows real statistics (46 alumni, 100% placement)  
✅ **Directory page** displays real student profiles  
✅ **Batch page** shows CSE 2018-2022 with actual students  
✅ **Search** finds real students by name  
✅ **Company filter** shows students by employer  

Your GradSync website will now display authentic placement data from your NBA 2025 Excel file!
