import React, { useContext, useState } from 'react';
import AuthForm from './AuthForm';
import { UserContext } from '../Context/UserProvider';
import "../Styles/Auth.css"

const initInputs = { username: '', password: '' };

export default function Auth() {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);
  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
  }

  function handleLogin(e) {
    e.preventDefault();
    login(inputs);
  }

  function toggleForm() {
    setToggle((prev) => !prev);
    resetAuthErr();
  }

  return (
    <div className='auth-container'>
    <div className="auth-body">
      <h1 className="welcome">Welcome to Surf Yurt</h1>
      {!toggle ? (
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            className="form-hold"
          />
          <p className="placeholder" onClick={toggleForm}>
            Dont Have an Account?
          </p>
        </>
      ) : (
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Signup"
            className="form-hold"
          />
          <p className="placeholder" onClick={toggleForm}>
            Already a member?
          </p>
        </>
      )}
    </div>
    </div>
  );
}
