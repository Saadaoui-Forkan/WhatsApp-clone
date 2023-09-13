import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './views/Chat';
import NotFound from './views/NotFound';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
