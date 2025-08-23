// API client for Phone Service Booking System
const API_BASE_URL = 'http://localhost:8081/api/v1';

// Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
  errorCode?: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role?: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
  password?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  deviceType?: string;
  estimatedDuration?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  serviceId: number;
  issueDescription?: string;
  deviceModel?: string;
  deviceBrand?: string;
  scheduledDate?: string;
  notes?: string;
}

export interface Booking {
  id?: number;
  customerId?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  technicianId?: number;
  technicianName?: string;
  serviceId?: number;
  serviceName?: string;
  servicePrice?: number;
  status?: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  bookingDate?: string;
  scheduledDate?: string;
  estimatedCompletionDate?: string;
  actualCompletionDate?: string;
  issueDescription?: string;
  deviceModel?: string;
  deviceBrand?: string;
  totalAmount?: number;
  advanceAmount?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Generic API functions
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// User API functions
export const userApi = {
  create: (user: User) => 
    apiRequest<User>('/users', { method: 'POST', body: JSON.stringify(user) }),
  
  getById: (id: number) => 
    apiRequest<User>(`/users/${id}`),
  
  getByEmail: (email: string) => 
    apiRequest<User>(`/users/email/${email}`),
  
  getByPhone: (phone: string) => 
    apiRequest<User>(`/users/phone/${phone}`),
  
  getAll: () => 
    apiRequest<User[]>('/users'),
  
  update: (id: number, user: User) => 
    apiRequest<User>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }),
  
  delete: (id: number) => 
    apiRequest<null>(`/users/${id}`, { method: 'DELETE' }),
  
  existsByEmail: (email: string) => 
    apiRequest<boolean>(`/users/exists/email/${email}`),
  
  existsByPhone: (phone: string) => 
    apiRequest<boolean>(`/users/exists/phone/${phone}`),
  
  search: (searchTerm: string) => 
    apiRequest<User[]>(`/users/search?searchTerm=${encodeURIComponent(searchTerm)}`),
};

// Service API functions
export const serviceApi = {
  create: (service: Service) => 
    apiRequest<Service>('/services', { method: 'POST', body: JSON.stringify(service) }),
  
  getById: (id: number) => 
    apiRequest<Service>(`/services/${id}`),
  
  getAll: () => 
    apiRequest<Service[]>('/services'),
  
  getActive: () => 
    apiRequest<Service[]>('/services/active'),
  
  getByCategory: (category: string) => 
    apiRequest<Service[]>(`/services/category/${encodeURIComponent(category)}`),
  
  getByDeviceType: (deviceType: string) => 
    apiRequest<Service[]>(`/services/device-type/${encodeURIComponent(deviceType)}`),
  
  getByPriceRange: (minPrice: number, maxPrice: number) => 
    apiRequest<Service[]>(`/services/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`),
  
  search: (searchTerm: string) => 
    apiRequest<Service[]>(`/services/search?searchTerm=${encodeURIComponent(searchTerm)}`),
  
  getCategories: () => 
    apiRequest<string[]>('/services/categories'),
  
  getDeviceTypes: () => 
    apiRequest<string[]>('/services/device-types'),
  
  update: (id: number, service: Service) => 
    apiRequest<Service>(`/services/${id}`, { method: 'PUT', body: JSON.stringify(service) }),
  
  delete: (id: number) => 
    apiRequest<null>(`/services/${id}`, { method: 'DELETE' }),
  
  activate: (id: number) => 
    apiRequest<null>(`/services/${id}/activate`, { method: 'POST' }),
  
  deactivate: (id: number) => 
    apiRequest<null>(`/services/${id}/deactivate`, { method: 'POST' }),
};

// Booking API functions
export const bookingApi = {
  create: (booking: CreateBookingRequest) => 
    apiRequest<Booking>('/bookings', { method: 'POST', body: JSON.stringify(booking) }),
  
  getById: (id: number) => 
    apiRequest<Booking>(`/bookings/${id}`),
  
  getByCustomerEmail: (email: string) => 
    apiRequest<Booking[]>(`/bookings/customer/email/${email}`),
  
  getByCustomerPhone: (phone: string) => 
    apiRequest<Booking[]>(`/bookings/customer/phone/${phone}`),
  
  getByCustomerId: (customerId: number) => 
    apiRequest<Booking[]>(`/bookings/customer/${customerId}`),
  
  getByStatus: (status: string) => 
    apiRequest<Booking[]>(`/bookings/status/${status}`),
  
  getByDateRange: (startDate: string, endDate: string) => 
    apiRequest<Booking[]>(`/bookings/date-range?startDate=${startDate}&endDate=${endDate}`),
  
  updateStatus: (id: number, status: string) => 
    apiRequest<Booking>(`/bookings/${id}/status?status=${status}`, { method: 'PUT' }),
  
  assignTechnician: (id: number, technicianId: number) => 
    apiRequest<Booking>(`/bookings/${id}/assign-technician?technicianId=${technicianId}`, { method: 'PUT' }),
  
  reschedule: (id: number, newDate: string) => 
    apiRequest<Booking>(`/bookings/${id}/reschedule?newDate=${newDate}`, { method: 'PUT' }),
  
  cancel: (id: number) => 
    apiRequest<null>(`/bookings/${id}/cancel`, { method: 'POST' }),
  
  search: (searchTerm: string) => 
    apiRequest<Booking[]>(`/bookings/search?searchTerm=${encodeURIComponent(searchTerm)}`),
};

// Utility functions
export const apiUtils = {
  // Check if user exists, if not create one
  async ensureUserExists(userData: Partial<User>): Promise<User> {
    try {
      // Try to find existing user by email
      if (userData.email) {
        const existingUser = await userApi.getByEmail(userData.email);
        return existingUser.data;
      }
      
      // Try to find existing user by phone
      if (userData.phone) {
        const existingUser = await userApi.getByPhone(userData.phone);
        return existingUser.data;
      }
      
      throw new Error('Email or phone is required to find or create user');
    } catch (error) {
      // User doesn't exist, create new one
      if (userData.name && userData.email && userData.phone) {
        const newUser: User = {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          role: 'CUSTOMER',
        };
        
        const createdUser = await userApi.create(newUser);
        return createdUser.data;
      }
      
      throw new Error('Insufficient user data to create new user');
    }
  },

  // Format price for display
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  },

  // Format date for display
  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Get service category display name
  getCategoryDisplayName: (category: string): string => {
    const categoryMap: Record<string, string> = {
      'Screen Replacement': 'Screen Replacement',
      'Battery Replacement': 'Battery Replacement',
      'Camera Repair': 'Camera Repair',
      'Audio Repair': 'Speaker/Microphone',
      'Charging Repair': 'Charging Port',
      'Water Damage': 'Water Damage',
      'Software Repair': 'Software Issues',
    };
    
    return categoryMap[category] || category;
  },

  // Get device type display name
  getDeviceTypeDisplayName: (deviceType: string): string => {
    const deviceTypeMap: Record<string, string> = {
      'iPhone': 'iPhone',
      'Samsung': 'Samsung',
      'Android': 'Other Android',
    };
    
    return deviceTypeMap[deviceType] || deviceType;
  },
};

export default {
  userApi,
  serviceApi,
  bookingApi,
  apiUtils,
};
