const API_BASE_URL = 'http://localhost:8080'

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('gradsync_token')
}

// Create headers with auth token
const createHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (includeAuth) {
    const token = getAuthToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }
  
  return headers
}

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth = false
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = createHeaders(includeAuth)
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  }
  
  const response = await fetch(url, config)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    
  register: (userData: any) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    
  refreshToken: (refreshToken: string) =>
    apiRequest('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),
    
  validateToken: (token: string) =>
    apiRequest('/api/auth/validate', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    
  getCurrentUser: () =>
    apiRequest('/api/auth/me', {
      method: 'GET',
    }, true),
}

// User API calls
export const userAPI = {
  getProfile: () =>
    apiRequest('/api/users/me', {
      method: 'GET',
    }, true),
    
  getDirectory: (params: {
    page?: number
    size?: number
    searchTerm?: string
    batchYear?: string
    branch?: string
    company?: string
    location?: string
  } = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.append(key, value.toString())
      }
    })
    
    return apiRequest(`/api/users/directory?${searchParams.toString()}`, {
      method: 'GET',
    }, true)
  },
  
  getFilters: () =>
    apiRequest('/api/users/filters', {
      method: 'GET',
    }, true),
    
  getStats: () =>
    apiRequest('/api/users/stats', {
      method: 'GET',
    }, true),
    
  getUserById: (id: string) =>
    apiRequest(`/api/users/${id}`, {
      method: 'GET',
    }, true),
}

// Job API calls (for future use)
export const jobAPI = {
  getJobs: (params: {
    page?: number
    size?: number
    searchTerm?: string
    jobType?: string
    location?: string
    experienceLevel?: string
    company?: string
  } = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.append(key, value.toString())
      }
    })
    
    return apiRequest(`/api/jobs?${searchParams.toString()}`, {
      method: 'GET',
    }, true)
  },
  
  createJob: (jobData: any) =>
    apiRequest('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    }, true),
}

export default {
  authAPI,
  userAPI,
  jobAPI,
}
