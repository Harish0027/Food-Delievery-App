
import './App.css';
import NavBar from './Components/Navbar/NavBar';
import SideBar from './Components/sideBar/SideBar';
import {Routes,Route} from "react-router-dom"
import Add from './pages/Add/Add';
import Lists from './pages/Lists/Lists';
import Orders from './pages/Orders/Orders';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <hr className='hr'/>
      <div className='app-content'>
        <SideBar/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/lists' element={<Lists/>}/>
          <Route path='/Orders' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
