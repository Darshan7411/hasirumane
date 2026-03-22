import api from '../utils/api';

// Auth services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  }
};

// Room services
export const roomService = {
  getAll: async () => {
    const response = await api.get('/rooms');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/rooms', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/rooms/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  }
};

// Booking services
export const bookingService = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  updateStatus: async (id, statusData) => {
    const response = await api.put(`/bookings/${id}`, statusData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};

// Gallery services
export const galleryService = {
  getAll: async (category = '') => {
    const response = await api.get(`/gallery${category ? `?category=${category}` : ''}`);
    return response.data;
  },

  getHeroImages: async () => {
    const response = await api.get('/gallery/hero');
    return response.data;
  },

  upload: async (formData) => {
    const response = await api.post('/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  uploadMultiple: async (formData) => {
    const response = await api.post('/gallery/upload-multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  }
};

// Amenity services
export const amenityService = {
  getAll: async (category = '') => {
    const response = await api.get(`/amenities${category ? `?category=${category}` : ''}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/amenities', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/amenities/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/amenities/${id}`);
    return response.data;
  }
};
