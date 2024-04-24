'use strict';

/**
 * first-entry router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::first-entry.first-entry');
