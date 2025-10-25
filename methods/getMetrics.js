const axiosInstance = require('../axiosInstance/axiosInstance');
const buildUrlAndParams = require('./util');

/**
 * Get metrics (optionally filtered by category)
 * @param {Object} [params] - Parameters for the request
 * @param {string} [params.category] - Category filter (IT or EN), e.g. "economia" or "economy"
 * @param {string} [params.lang] - Output language: "it" or "en" (default: "it")
 * @returns {Promise<Object>} - Metrics response payload
 */
async function getMetrics(params = {}) {
  try {
    const { category, lang = 'it' } = params;
    const url = buildUrlAndParams('/metrics', { category, lang });
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.error || error.message || 'getMetrics error';
    throw new Error(msg);
  }
}

module.exports = getMetrics;