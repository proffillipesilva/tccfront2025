import React, {useState, useEffect} from "react";
import usuarioService from "./services/usuarioService";
// ==============================================================================
// Main App Component for Authentication Form
// This component uses the usuarioService to handle authentication logic.
// ==============================================================================
const EnterPage = () => {
  // State to toggle between sign-up and sign-in modes
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  // States for form input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // States to manage the request status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null); // Stores the authentication token

  // Effect to load the authentication token from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Handle form submission for both sign-up and sign-in
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission behavior

    setLoading(true); // Set loading to true when the request starts
    setError(null);    // Clear any previous errors

    try {
      let responseData;
      if (isSignUpMode) {
        // Call the signUp function from usuarioService
        responseData = await usuarioService.signUp({ email, password, name });
        // After successful sign-up, clear inputs and switch to sign-in mode
        setEmail('');
        setPassword('');
        setName('');
        setIsSignUpMode(false);
        alert('Sign up successful! Please sign in using your new credentials.');
      } else {
        // Call the signIn function from usuarioService
        responseData = await usuarioService.signIn({ email, password });
        // If sign-in is successful and a token is returned, store it
        if (responseData && responseData.token) {
          localStorage.setItem('authToken', responseData.token);
          setToken(responseData.token); // Update the component's token state
        }
      }
    } catch (err) {
      console.error('Authentication Error:', err);
      // Extract error message from Axios error response or use a generic message
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setToken(null); // Clear the token from component state
    // Optionally clear form fields on logout
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isSignUpMode ? 'Sign Up' : 'Sign In'}
        </h2>

        {/* Display token and logout button if user is logged in */}
        {token && (
          <div className="mb-4 text-center p-3 bg-green-100 text-green-700 rounded-md">
            <p className="font-semibold">Logged In!</p>
            <p className="text-sm break-all">Token: {token}</p>
            <button
              onClick={handleLogout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Render name field only in sign-up mode */}
          {isSignUpMode && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUpMode}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Processing...' : (isSignUpMode ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        {/* Display error message if any */}
        {error && (
          <p className="mt-4 text-center text-red-600 text-sm">{error}</p>
        )}

        {/* Toggle button to switch between sign-up and sign-in modes */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUpMode(!isSignUpMode)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
          >
            {isSignUpMode
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EnterPage;