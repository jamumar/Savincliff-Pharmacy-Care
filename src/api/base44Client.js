// Mocking the base44 client to bypass actual SDK calls for frontend testing
export const base44 = {
  auth: {
    me: async () => {
      // CHANGE THIS TO NULL TO TEST THE LANDING PAGE RESTRICTION
      // return null; 
      
      return { 
        id: 'mock-user-123', 
        name: 'Mock Admin', 
        email: 'admin@savincliffpharmacy.com',
        role: 'admin' 
      };
    },
    login: async () => ({ success: true }),
    logout: async () => {
        // In a real app, this would clear tokens. For the mock, just reload
        window.location.reload();
        return { success: true };
    },
  },
  db: {
    collection: () => ({
      get: async () => [],
      add: async () => ({ id: 'new-id' }),
    }),
  },
  functions: {
    invoke: async () => ({ data: {} }),
  }
};
