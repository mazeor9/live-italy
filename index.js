const getStatistics = require('./methods/getStatistics');
const getCategories = require('./methods/getCategories');
const getMetrics = require('./methods/getMetrics');
const getHealth = require('./methods/getHealth');

// CJS named + default style (like your reference package)
module.exports = {
  getStatistics,
  getCategories,
  getMetrics,
  getHealth,
};

module.exports.getStatistics = getStatistics;
module.exports.getCategories = getCategories;
module.exports.getMetrics = getMetrics;
module.exports.getHealth = getHealth;
