import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  //setup useState to store initial state/data
  const [credentials, setCredentials] = useState({
      username: '',
      password: ''
  })


  //handleInputChanges
  const handleInputChanges = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }


  //handleLoginSubmit
  //use axiosWithAuth --> all done inside handleLoginSubmit --> props.history.push('/BubblePage')
  const handleLoginSubmit = (event) => {
    event.preventDefault()
    
    //axiosWithAuth to login
    axiosWithAuth()
      .post('/login', credentials)
      .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.payload)

          //reset values back to empty strings
          setCredentials({
            username: '',
            password: ''
          })

          //automatically redirect to login --> BubblePage
          props.history.push('/BubblePage')


      })
      .catch(error => {
        console.log('Sorry, login credentials not valid', error)
      })

  }


  return (
    <div>
      <h1>Bubbles Login </h1>
      <form onSubmit={handleLoginSubmit} >
        <input 
          type='text'
          name='username'
          placeholder='Username'
          value={credentials.username}
          onChange={handleInputChanges}
        />
        <input 
          type='text'
          name='password'
          placeholder='Password'
          value={credentials.password}
          onChange={handleInputChanges}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
