import Footer from "./components/Footer";
import Theme from "./components/Theme";
import InstallApp from "./components/InstallApp";
import Router from "./routes";
import { ToastContainer } from 'react-toastify'

function App() {
  return(
    <>
      <ToastContainer 
        autoClose={3000}
        position="top-right"
        theme="colored"
        className="z-[100]"
      />
      <Theme/>
      <InstallApp />
      <div className="bg-surface-light dark:bg-surface-dark min-h-screen">
        <Router />
      </div>
      <Footer/>
    </>
  );
}

export default App;