import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './views/Chat';
import NotFound from './views/NotFound';
import Register from './views/Register';
import Login from './views/Login';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
