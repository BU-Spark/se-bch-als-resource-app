'use strict';

/**
 * tree-level router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tree-level.tree-level');
