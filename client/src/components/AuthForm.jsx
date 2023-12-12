import React from 'react';
import '../App.css';

export default function AuthForm(props) {
  const {
    handleChange,
    handleSubmit,
    btnText,
    inputs: { username, password },
  } = props;
  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <input
        className="username"
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        className="password"
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={handleSubmit} className="authBtn">
        {btnText}
      </button>
    </form>
  );
}
