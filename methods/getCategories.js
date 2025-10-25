const axiosInstance = require('../axiosInstance/axiosInstance');
const buildUrlAndParams = require('./util');

/**
 * Get available categories
 * @param {Object} [params] - Parameters for the request
 * @param {string} [params.lang] - Output language: "it" or "en" (default: "it")
 * @returns {Promise<Object>} - Categories response payload
 */
async function getCategories(params = {}) {
  try {
    const { lang = 'it' } = params;
    const url = buildUrlAndParams('/categories', { lang });
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.error || error.message || 'getCategories error';
    throw new Error(msg);
  }
}

module.exports = getCategories;