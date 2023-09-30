import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './views/Chat';
import NotFound from './views/NotFound';
import Register from './views/Register';
import Login from './views/Login';

function App() {
  const user = JSON.parse(localStorage.getItem('user'))?.data?.name
  return (
    <Router>
      <Routes>
        <Route path="/" element={ user ? <Chat/> : <Navigate to="/login" /> }/>
        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" /> }/>
        <Route path="/register" element={ !user ? <Register /> : <Navigate to="/login" /> }/>
        <Route path= "/*" element={ <NotFound/> }/>
      </Routes>
    </Router>
  );
}

export default App;
