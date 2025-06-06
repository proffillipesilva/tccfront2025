import api from "./api";
// ==============================================================================
// Conceptual File: src/services/usuarioService.js
// --- API Service Functions ---
// These functions encapsulate the API calls related to the User entity.
// This would typically be in a separate file, importing the configured axios instance.
// ==============================================================================

const usuarioService = {
  /**
   * Creates a new user (Sign Up).
   * @param {object} userData - User data for sign-up (email, password, name).
   * @returns {Promise<object>} The created user object.
   */
  signUp: async (userData) => {
    try {
      const response = await api.post('api/usuarios/signUp', userData);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * User sign-in.
   * @param {object} credentials - User credentials (email, password).
   * @returns {Promise<object>} An object containing the authentication token.
   */
  signIn: async (credentials) => {
    try {
      const response = await api.post('/api/usuarios/login', credentials);
      // The token is stored by the response interceptor in the authentication component,
      // but the login component might still need to process this response directly.
      return response.data;
    } catch (error) {
      console.error('Error signing in:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Fetches all users. Requires authentication.
   * @returns {Promise<Array<object>>} A list of user objects.
   */
  getAllUsuarios: async () => {
    try {
      const response = await api.get('/api/usuarios');
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Fetches a user by ID. Requires authentication.
   * @param {string} id - The ID of the user.
   * @returns {Promise<object>} The user object.
   */
  getUsuarioById: async (id) => {
    try {
      const response = await api.get(`/api/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Fetches a user by email. Requires authentication.
   * @param {string} email - The email of the user.
   * @returns {Promise<object>} The user object.
   */
  getUsuarioByEmail: async (email) => {
    try {
      const response = await api.get(`/api/usuarios/email/${email}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with email ${email}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Updates an existing user's details. Requires authentication.
   * @param {string} id - The ID of the user to update.
   * @param {object} userData - Partial user data for update (e.g., email, password, name).
   * @returns {Promise<object>} The updated user object.
   */
  updateUsuario: async (id, userData) => {
    try {
      const response = await api.put(`/api/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Updates a user's authentication token. Requires authentication.
   * @param {string} id - The ID of the user whose token to update.
   * @param {object} tokenObject - An object containing the new token ({ token: 'new_token_string' }).
   * @returns {Promise<object>} The updated user object.
   */
  updateUsuarioToken: async (id, tokenObject) => {
    try {
      const response = await api.put(`/api/usuarios/${id}/token`, tokenObject);
      return response.data;
    } catch (error) {
      console.error(`Error updating token for user ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Deletes a user. Requires authentication.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>}
   */
  deleteUsuario: async (id) => {
    try {
      await api.delete(`/api/usuarios/${id}`);
      console.log(`User with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Uploads a profile picture for a user. Requires authentication.
   * @param {string} userId - The ID of the user.
   * @param {File} file - The image file to upload.
   * @returns {Promise<object>} The updated user object with the profile picture URL.
   */
  uploadProfilePicture: async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // 'file' matches the @RequestParam("file") name in Spring

      const response = await api.post(`/api/usuarios/${userId}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios automatically sets boundary for FormData
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error uploading profile picture for user ID ${userId}:`, error.response?.data || error.message);
      throw error;
    }
  },
};

export default usuarioService;