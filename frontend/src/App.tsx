import Footer from "./components/Footer";
import Theme from "./components/Theme";
import Router from "./routes";
import { ToastContainer } from 'react-toastify'

function App() {
  return(
    <>
      <ToastContainer 
        autoClose={3000}
        position="top-right"
        theme="colored"
      />
      <Theme/>
      <div className="bg-white dark:bg-gray-700">
        <Router />
      </div>
      <Footer/>
    </>
  );
}

export default App;
