'use strict';

/**
 * first-entry service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::first-entry.first-entry');
