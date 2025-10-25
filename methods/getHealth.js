const axiosInstance = require('../axiosInstance/axiosInstance');

/**
 * Get API health status
 * @returns {Promise<Object>} - Health response payload
 */
async function getHealth() {
  try {
    const { data } = await axiosInstance.get('/health');
    return data;
  } catch (error) {
    const msg = error?.response?.data?.error || error.message || 'getHealth error';
    throw new Error(msg);
  }
}

module.exports = getHealth;