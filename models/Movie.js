import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
