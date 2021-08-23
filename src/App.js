import React from 'react';
import Signup from './components/authentication/Signup';
import Profile from './components/Profile';
import Login from './components/authentication/Login';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/authentication/PrivateRoute';
import ForgotPassword from './components/authentication/ForgotPassword';
import UpdateProfile from './components/authentication/UpdateProfile';
import Dashboard from './components/google-drive/Dashboard';
import Workouts from './components/workout/Workouts';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Drive */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

          {/* Workouts */}
          <PrivateRoute exact path="/workouts" component={Workouts} />

          {/* Profile */}
          <PrivateRoute path="/user" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* Authentication */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
