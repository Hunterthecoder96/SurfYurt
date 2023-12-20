const express = require('express');
const surfboardRouter = express.Router();
const Surfboard = require('../models/surfboard');
const surfboard = require('../models/surfboard');
const Comment = require('../models/comment')
const User = require('../models/user')

surfboardRouter.get('/', (req, res, next) => {
  Surfboard.find()
  .populate('user', '-password')
    .exec((err, surfboards) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(surfboards);
  });
});


//FOR NOTES
// surfboardRouter.get('/surfboardWcomments', async (req, res, next) => {
//   try {
//     const surfboards = await Surfboard.find()

//     const allData = await Promise.all(surfboards.map(async board => {
//       const comments = await Comment.find({surfboardId: board._id}).populate('user', '-password')
//       const user = await User.findById(board.user)
//       return {...board.toObject(), comments, user: user.withoutPassword()}
//     }))

//     return res.status(201).send(allData)

//   } catch (err) {
//     res.status(500)
//     return next(err)
//   }
// })

surfboardRouter.get('/user', (req, res, next) => {
  Surfboard.find({ user: req.auth._id }, (err, surfboards) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(surfboards);
  });
});

surfboardRouter.post('/', (req, res, next) => {
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

surfboardRouter.delete('/:surfboardId', (req, res, next) => {
  Surfboard.findOne(
    { _id: req.params.surfboardId, user: req.auth._id },
    (err, deletedSurfboard) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`successfully deleted surfboard:${deletedSurfboard.model}`);
    }
  );
});

surfboardRouter.put('/:surfboardId', (req, res, next) => {
  Surfboard.findOneAndUpdate(
    { _id: req.params.surfboardId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updated) => {
      if (err) {
        res.status(201).send(updatedSurfboard);
      }
    }
  );
});

const handleStars = (surfboardId, req, res, next) => {
  surfboard.findOne({ _id: surfboardId }, (err, surfboard) => {
    if (err) {
      return handleErrors(res, next, err);
    }
    if (surfboard['stars'].includes(req.auth._id)) {
      surfboard.updateOne(
        { _id: surfboardId },
        { $addToSet: update },
        { new: true },
        (err, updatedStar) => {
          if (err) {
            return handleErrors(res, next, err);
          }
          return res.status(201).send(updatedStar);
        }
      );
    }
  });
};

surfboardRouter.put('/stars/:surfboardId', (req, res, next) => {
  handleStars(req.params.surfboardId, req, res, next);
});

module.exports = surfboardRouter;
