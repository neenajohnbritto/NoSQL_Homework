const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  console.log("body"+req.body);
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.put("/api/workouts/:id", ({ body, params}, res) => {
  Workout.findByIdAndUpdate(params.id, {$push:{exercise:body}}, {new: true, runValidators: true})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



router.get("/api/workouts", (req, res) => {
  Workout.find()
    .sort({ date: -1 })
    .then(dbWorkout => {
      console.log("api workouts" + res);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
