'use strict';

/**
 * tree-level service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tree-level.tree-level');
