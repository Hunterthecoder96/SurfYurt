import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserProvider';
import Rating from './Rating';

const initInputs = {
  shaper: '',
  model: '',
  size: '',
  image: '',
  rating: [{ score: 0 }],
  description: '',
};

export default function BoardForm(props) {
  const [inputs, setInputs] = useState(initInputs);

  const { addBoard } = useContext(UserContext);

  function handleRating(e) {
    const { value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      rating: [{ score: value }],
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    addBoard(inputs);
    setInputs(initInputs);
  }

  const { shaper, model, size, image, rating, description } = inputs;

  return (
    <form className="boardForm-container" onSubmit={handleSubmit}>
      <p>Shaper:</p>
      <input
        type="text"
        name="shaper"
        placeholder="shaper"
        value={shaper}
        onChange={handleChange}
      />
      <p>Model:</p>
      <input
        type="text"
        name="model"
        value={model}
        onChange={handleChange}
        placeholder="model"
      />
      <p>Size:</p>
      <input
        type="text"
        name="size"
        value={size}
        onChange={handleChange}
        placeholder="size"
      />
      <p>Photo of board:</p>
      <input
        type="file"
        name="image"
        value={image}
        onChange={handleChange}
        placeholder="URL"
      />
      <Rating onChange={handleRating} value={rating.score} />

      <p>Thoughts about this board:</p>
      <textarea
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="whats wrong with this board"
      />

      <button>Submit</button>
    </form>
  );
}
