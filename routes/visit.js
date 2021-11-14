
const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

const router = express.Router();

const visitValidators = [
  check('visitedOn')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Visited On')
    .isISO8601()
    .withMessage('Please provide a valid date for Visited On'),
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 0 and 5'),
];

router.get('/attraction/:attractionId(\\d+)/visit/add', requireAuth, csrfProtection,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.attractionId, 10);
    const attraction = await db.Attraction.findByPk(attractionId);
    const attractionVisit = db.AttractionVisit.build();
    res.render('visit-add', {
      title: 'Add Attraction Visit',
      attraction,
      attractionVisit,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/attraction/:attractionId(\\d+)/visit/add', requireAuth, csrfProtection, visitValidators,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.attractionId, 10);
    const attraction = await db.Attraction.findByPk(attractionId);

    const {
      visitedOn,
      rating,
      comments
    } = req.body;

    const attractionVisit = db.AttractionVisit.build({
      userId: res.locals.user.id,
      attractionId,
      visitedOn,
      rating,
      comments
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await attractionVisit.save();
      res.redirect(`/attraction/${attractionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('visit-add', {
        title: 'Add Attraction Visit',
        attraction,
        attractionVisit,
        errors,
        csrfToken: req.csrfToken(),
      })
    }
  }));

module.exports = router;