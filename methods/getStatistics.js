const axiosInstance = require('../axiosInstance/axiosInstance');
const buildUrlAndParams = require('./util');

/**
 * Get Live Italy statistics
 * @param {Object} [params] - Parameters for the request
 * @param {string} [params.category] - Category filter (IT or EN), e.g. "economia" or "economy"
 * @param {string} [params.metric] - Metric filter (IT or EN), e.g. "pil" or "gdp"
 * @param {string} [params.lang] - Output language: "it" or "en" (default: "it")
 * @param {number} [params.limit] - Max items to return (default: 100, max: 1000)
 * @param {number} [params.offset] - Pagination offset (default: 0)
 * @param {string} [params.sort] - Sort field: "category" | "metric" | "value" | "updated_at" | "last_updated" (default: "updated_at")
 * @param {string} [params.order] - Sort order: "asc" or "desc" (default: "desc")
 * @param {string} [params.format] - Response format: "full" or "compact" (default: "full")
 * @returns {Promise<Object>} - Statistics response payload
 */
async function getStatistics(params = {}) {
  try {
    const {
      category,
      metric,
      lang = 'it',
      limit,
      offset,
      sort,
      order,
      format
    } = params;

    const url = buildUrlAndParams('/statistics', {
      category,
      metric,
      lang,
      limit,
      offset,
      sort,
      order,
      format
    });

    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.error || error.message || 'getStatistics error';
    throw new Error(msg);
  }
}

module.exports = getStatistics;