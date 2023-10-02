import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './views/Chat';
import NotFound from './views/NotFound';
import Register from './views/Register';
import Login from './views/Login';
import Password from './views/Password';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Chat setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isLoggedIn ? (
                <Register setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/password" element={<Password />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
}

export default App;
