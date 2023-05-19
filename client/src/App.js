import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, SignupPage } from './component/User';
import TodoApp from './component/Todo';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleSignup = () => {
    setRedirectToLogin(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenticated ? <Redirect to="/todos" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {authenticated ? (
            <Redirect to="/todos" />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/signup">
          {authenticated ? (
            <Redirect to="/todos" />
          ) : redirectToLogin ? (
            <Redirect to="/login" />
          ) : (
            <SignupPage onSignup={handleSignup} />
          )}
        </Route>
        <Route path="/todos">
          {authenticated ? (
            <TodoApp onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
