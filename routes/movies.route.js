import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// getMovie middleware
const getMovie = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie === null) {
      return res
        .status(404)
        .json({ message: `Cannot find movie with id: ${req.params.id}` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.movie = movie;
  next();
};

// list
router.get('/', async (req, res) => {
  try {
    const users = await Movie.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one
router.get('/:id', getMovie, (req, res) => {
  return res.json(res.movie);
});

// create
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update
router.put('/:id', getMovie, async (req, res) => {
  try {
    const updatedMovie = await res.movie.set(req.body);
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete
router.delete('/:id', getMovie, async (req, res) => {
  try {
    await res.movie.deleteOne();
    res.json({ message: `Deleted movie: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
