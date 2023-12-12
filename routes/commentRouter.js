const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/comment');
const { expressjwt } = require('express-jwt');

commentRouter.get('/', (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comments);
  });
});

commentRouter.post(
  '/:surfboardId',
  expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }),
  (req, res, next) => {
    console.log(req.body);
    req.body.user = req.auth._id;
    req.body.surfboardId = req.params.surfboardId;
    const newComment = new Comment(req.body);
    newComment.save((err, savedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(savedComment);
    });
  }
);

commentRouter.delete('/:commentId', (req, res, next) => {
  Comment.findOne(
    { _id: req.params.commentId, user: req.auth._id },
    (err, deletedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send('successfully deleted comment');
    }
  );
});

module.exports = commentRouter;
