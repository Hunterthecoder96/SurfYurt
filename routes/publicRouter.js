const express = require('express');
const publicRouter = express.Router();
const Surfboard = require('../models/surfboard');

publicRouter.get('/', (req, res, next) => {
  Surfboard.find((err, surfboards) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(surfboards);
  });
});

publicRouter.post('/', (req, res, next) => {
  req.body.user = req.auth._id;
  const newSurfboard = new Surfboard(req.body);
  newSurfboard.save((err, savedSurfboard) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedSurfboard);
  });
});

module.exports = publicRouter;
