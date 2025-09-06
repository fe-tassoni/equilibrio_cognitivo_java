
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';
import Dashboard from './Dashboard';
import HomePublic from './HomePublic';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    getCurrentUser()
      .then(user => setIsLoggedIn(!!user))
      .catch(() => setIsLoggedIn(false));
  }, []);
  return isLoggedIn ? <Dashboard /> : <HomePublic />;
}

export default Home;
