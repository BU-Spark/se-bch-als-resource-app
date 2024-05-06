'use strict';

/**
 * question-to-choice-map service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::question-to-choice-map.question-to-choice-map');
