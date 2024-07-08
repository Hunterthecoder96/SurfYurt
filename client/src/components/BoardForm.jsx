import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserProvider';
import Rating from './Rating';

const initInputs = {
  shaper: '',
  model: '',
  size: '',
  image: '',
  rating: { score: 0 },
  description: '',
};


export default function BoardForm(props) {
  const [inputs, setInputs] = useState(initInputs);

  const { addBoard } = useContext(UserContext);
  console.log(inputs)

  function handleRating(value) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      rating: { score: value },
    }));
  }



  function handleChange(e) {
    const { name, value, type, image} = e.target;
    if (type === 'file') {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: image,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
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
      <select
        type="text"
        name="size"
        value={size}
        onChange={handleChange}
        placeholder="size"
      >
      <option value="4'10">4'10"</option>
      <option value="4'11">4'11"</option>
      <option value="5'0">5'0"</option>
      <option value="5'1">5'1"</option>
      <option value="5'2">5'2"</option>
      <option value="5'3">5'3"</option>
      <option value="5'4">5'4"</option>
      <option value="5'5">5'5"</option>
      <option value="5'6">5'6"</option>
      <option value="5'7">5'7"</option>
      <option value="5'8">5'8"</option>
      <option value="5'9">5'9"</option>
      <option value="5'10">5'10"</option>
      <option value="5'11">5'11"</option>
      <option value="6'0">6'0"</option>
      <option value="6'1">6'1"</option>
      <option value="6'2">6'2"</option>
      <option value="6'3">6'3"</option>
      <option value="6'4">6'4"</option>
      <option value="6'5">6'5"</option>
      <option value="6'6">6'6"</option>
      <option value="6'7">6'7"</option>
      <option value="6'8">6'8"</option>
      <option value="6'9">6'9"</option>
      <option value="6'10">6'10"</option>
      <option value="6'11">6'11"</option>
      <option value="7'0">7'0"</option>
      <option value="7'1">7'1"</option>
      <option value="7'2">7'2"</option>
      <option value="7'3">7'3"</option>
      <option value="7'4">7'4"</option>
      <option value="7'5">7'5"</option>
      <option value="7'6">7'6"</option>
      <option value="7'7">7'7"</option>
      <option value="7'8">7'8"</option>
      <option value="7'9">7'9"</option>
      <option value="7'10">7'10"</option>
      <option value="7'11">7'11"</option>
      <option value="8'0">8'0"</option>
      <option value="8'1">8'1"</option>
      <option value="8'2">8'2"</option>
      

      </select>
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
