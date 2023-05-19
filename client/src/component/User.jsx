import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Paper,
  Grid,
  Link,
} from '@mui/material';
import { userLogin, userSignup } from '../services/api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const data = {
        email,
        password,
      };
      const token = await userLogin(data);
      if (token) {
        localStorage.setItem('token', JSON.stringify(token));
        onLogin();
      } else {
        alert('Please check your username and password');
      }
    } else {
      alert('Enter your email and password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '16px' }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Link href="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email && password) {
      const data = {
        email,
        password,
      };
      const res = await userSignup(data);
      if (res.id) {
        alert('Success');
        onSignup();
      } else {
        alert('User already exists');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '16px' }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Link href="/login" variant="body2">
            Already have an account? Login
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export { LoginPage, SignupPage };
