import axios from 'axios';

const verifyToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get('https://eggbucket-website.onrender.com/admin/egg-bucket-b2b/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.status === 'success') {
      return true;
    } else {
      throw new Error('Token verification failed');
    }
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};

export default verifyToken;