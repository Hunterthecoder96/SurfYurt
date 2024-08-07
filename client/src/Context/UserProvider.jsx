import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

const userAxios = axios.create();
userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    boards: [],
  };

  const [userState, setUserState] = useState(initState);
  const [publicSurfboards, setPublicSurfboards] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: '' });

  function signup(credentials) {
    axios
      .post('/auth/signup', credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function login(credentials) {
    axios
      .post('/auth/login', credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState({
      user: {},
      token: '',
      boards: [],
    });
  }
  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }
  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: '',
    }));
  }

  console.log(userState);
  //BoardForm
  function addBoard(newBoard) {
    userAxios
      .post('/api/surfboard', newBoard)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          boards: [...prevState.boards, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getComments(comment) {
    userAxios
      .get('/api/comment')
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    console.log(e);
    const { name, value } = e.target;
    setNewComment((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function addComment(id) {
    console.log('inside addcomment func', newComment);
    userAxios
      .post(`/api/comment/${id}`, newComment)
      .then((res) => {
        setComments((prevState) => [...prevState, res.data]);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getAllSurfboards() {
    userAxios
      .get('/public')
      .then((res) => {
        setPublicSurfboards(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getAllSurfboards();
  }, []);

  function getUserBoard() {
    userAxios
      .get('/api/surfboard/user')
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          boards: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const deleteBoard = async (boardId) => {
    try {
      await userAxios.delete(`/api/surfboard/${boardId}`);
      setUserState((prevState) => ({
        ...prevState,
        boards: prevState.boards.filter(board => board._id !== boardId),
      }));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data.errMsg);
      } else {
        console.log("An error occurred while deleting the board.");
      }
    }
  };
  
  return (
    <UserContext.Provider
      value={{
        ...userState,
        comments,
        signup,
        login,
        logout,
        handleAuthErr,
        resetAuthErr,
        addBoard,
        getUserBoard,
        getAllSurfboards,
        publicSurfboards,
        setUserState,
        getComments,
        addComment,
        newComment,
        handleChange,
        deleteBoard,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
