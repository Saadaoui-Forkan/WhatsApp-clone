import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './views/Chat';
import NotFound from './views/NotFound';
import Register from './views/Register';
import Login from './views/Login';
import Auth from './Auth'
import AppRoute from './AppRoute'

function App() {
  useEffect(() => {
    Auth.init();
  }, []);
  return (
    <Router>
    <Routes>
        <Route 
          path="/" 
          element={ 
            <AppRoute
              redirect='/login'
              user={Auth.auth}
            >
              <Chat/>
            </AppRoute> 
          }
        />
        <Route 
          path="/register" 
          element={ 
            <AppRoute
              redirect='/'
              user={Auth.guest}
            >
              <Register/>
            </AppRoute> 
          }
        />
        <Route 
          path="/login" 
          element={ 
            <AppRoute
              redirect='/'
              user={Auth.guest}
            >
              <Login/>
            </AppRoute> 
          }
        />
        <Route path= "/*" element={ <NotFound/> }/>
      </Routes>
    </Router>
  );
}

export default App;
