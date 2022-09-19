import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode'

//components 
import Footer from './components/Footer';
import Header from './components/Header';
import Hashtag from './pages/Hashtag';
import PersistLogin from './components/PersistLogin';

//pages
import Feed from './pages/Feed';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

//context
import AuthContext from './context/AuthProvider';

//hooks
import useAuth from './hooks/useAuth';
import RequireAuth from './components/RequireAuth';
import FindUser from './pages/FindUser';


const App = () => {

  const persist = localStorage.getItem("persist") || false;




  return (
    <div > 
      <Header />
      <Routes>
        <Route path="/"  >
          {persist ? <Route element={<PersistLogin />}>

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="hashtag" element={<Hashtag />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="finduser" element={<FindUser />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/" element={<Feed />} />
            </Route>

          </Route> : (<><Route path="/" element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /></>)}













          {/* not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
